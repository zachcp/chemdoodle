library(rcdk)
library(dplyr)
library(RJSONIO)

#' 
#' @return IAtomContainer with coordinates
#' @export
#'
mol_from_smiles <- function(smiles){
    parse.smiles(smiles) %>%
        generate.2d.coordinates()
}

#' 
#' @return list compatable with ChemDoodle Webcomponenets API
#' 
process_molecule <- function(mol){
    #atom and bond info
    atoms = get.atoms(mol)
    bonds = get.bonds(mol)
    atomhashes <- sapply(atoms, FUN=function(x){x$hashCode()})
    
    process_atom <- function(atom){
        coord <- atom$getPoint2d()
        x = coord$x
        y = coord$y
        list(x = coord$x,
             y = coord$y,
             l = atom$getSymbol())
    }
    
    process_bond <- function(bond, mol= mol){
        order <- bond$getOrder()$ordinal()
        bondatoms <- get.atoms(bond)
        source_atom = bondatoms[[1]]
        target_atom = bondatoms[[2]]
        list(o = order,
             b = which(atomhashes == source_atom$hashCode()),
             e = which(atomhashes == target_atom$hashCode()))
    }
    
    list(a = lapply(atoms,process_atom),
         b = lapply(bonds,process_bond))
}

#'
#' @export
smiles_to_json <- function(smiles){
    smiles %>%
        mol_from_smiles() %>%
        process_molecule() %>%
        toJSON()
}

# "CCCNCNCNCC" %>%
#     mol_from_smiles() %>%
#     process_molecule() %>%
#     toJSON() %>%
#     cat()