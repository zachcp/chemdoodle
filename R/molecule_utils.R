#' mol_from_smiles
#'
#' get an AtomContainer with 2d cords from a smiles string
#'
#' @importFrom rcdk parse.smiles
#' @importFrom rcdk generate.2d.coordinates
#'
#' @return IAtomContainer with coordinates
#' @export
#'
mol_from_smiles <- function(smiles){
    smi <- parse.smiles(smiles)
    generate.2d.coordinates(smi[[1]]) #take the first of the list
}

#' process_molecule
#'
#' create JSON from an AtomContainer
#'
#' @importFrom rcdk get.atoms
#' @importFrom rcdk get.bonds
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
        data.frame(x = coord$x,
                   y = coord$y,
                   l = atom$getSymbol())
    }

    process_bond <- function(bond, mol= mol){
        order <- bond$getOrder()$ordinal() + 1
        bondatoms <- get.atoms(bond)
        source_atom = bondatoms[[1]]
        target_atom = bondatoms[[2]]
        data.frame(o = order,
                   b = which(atomhashes == source_atom$hashCode()) - 1,
                   e = which(atomhashes == target_atom$hashCode()) - 1)
    }

    atomdata = Reduce(rbind, Map(process_atom, atoms))
    bonddata = Reduce(rbind, Map(process_bond, bonds))

    list(b = bonddata, a = atomdata )

}

#' smiles_to_json
#'
#' smiles string -> chemdoodle JSON
#'
#' @importFrom RJSONIO toJSON
#' @export
smiles_to_json <- function(smiles){
    smiles %>%
        mol_from_smiles() %>%
        process_molecule()
    #%>%
     #   toJSON()
}

# "CCCNCNCNCC" %>%
#     mol_from_smiles() %>%
#     process_molecule() %>%
#     toJSON() %>%
#     cat()
