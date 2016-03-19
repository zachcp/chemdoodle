#' make a CDK atom from ChemDoodle JSON
#' 
#' a (Array) : Array of atom objects.
#'   [
#'   {
#'     i (String) : A unique identifier for this atom, only needs to be provided if necessary
#'     ,l (String, default='C') : Label
#'     ,x (Number, required) : X coordinate
#'     ,y (Number, required) : Y coordinate
#'     ,z (Number, default=0) : Z coordinate
#'     ,c (Integer, default=0) : Charge
#'     ,m (Integer, default=-1) : Mass
#'     ,r (Integer, default=0) : Number of radicals
#'     ,p (Integer, default=0) : Number of lone pairs
#'     ,q (Object, default=undefined) : If present, this object defines the query for the atom, as described by the query section below
#'   }, 
#'   ]
#'   
#' @keywords internal
createAtom <- function(atom){
  
  Atom   <- J("org.openscience.cdk.Atom")
  Point  <- J("javax.vecmath.Point2d")
  Double <- J("java.lang.Double")
  
  atomelement <- atom$l
  atomX       <- as.numeric(atom$x)
  atomY       <- as.numeric(atom$y)
  if (is.null(atomelement)) atomelement <- "C"
  
  if (is.null(atomX) | is.null(atomY)){
    
    return( new(Atom, atomelement) )
  
  } else {
    point <- new( Point, atomX, atomY )
    return( new(Atom, atomelement, point))
  }
}

#' Process Chemdoodle JSON
#' 
#' Take a Chemdoodle R-JSON Object and convert it into a CDK Molecule
#'
#' 
#' {
#'   a (Array) : Array of atom objects.
#'   [
#'   {
#'     i (String) : A unique identifier for this atom, only needs to be provided if necessary
#'     ,l (String, default='C') : Label
#'     ,x (Number, required) : X coordinate
#'     ,y (Number, required) : Y coordinate
#'     ,z (Number, default=0) : Z coordinate
#'     ,c (Integer, default=0) : Charge
#'     ,m (Integer, default=-1) : Mass
#'     ,r (Integer, default=0) : Number of radicals
#'     ,p (Integer, default=0) : Number of lone pairs
#'     ,q (Object, default=undefined) : If present, this object defines the query for the atom, as described by the query section below
#'   }, ...
#'   ]
#'   ,b (Array) : Array of bond objects. This array does not need to be included if it is empty.
#'   [
#'   {
#'     i (String) : A unique identifier for this bond, only needs to be provided if necessary
#'     ,b (Integer, required) : Index of the atom in the atom array that this bond begins with.
#'     ,e (Integer, required) : Index of the atom in the atom array that this bond ends with.
#'     ,o (Number, default=1) : Bond order, this can be integers or positive half increments or 0
#'     ,s (String, default='none') : Stereochemistry of the bond. Accepted values are 'none', 'protruding', 'recessed' or 'ambiguous'.
#'     ,q (Object, default=undefined) : If present, this object defines the query for the bond, as described by the query section below
#'   }, ...
# '  ]
# '}
#'
#' @export
processChemDoodleJson <- function(moljson){
  
  # some CDK Definitions
  Bond        <- J("org.openscience.cdk.Bond")
  Matcher     <- J("org.openscience.cdk.atomtype.CDKAtomTypeMatcher")
  Manipulator <- J("org.openscience.cdk.tools.manipulator.AtomTypeManipulator")
  AddHydrogen <- J("org.openscience.cdk.tools.CDKHydrogenAdder")
  
  single  <- .jfield("org.openscience.cdk.interfaces.IBond$Order",,"SINGLE")
  double  <- .jfield("org.openscience.cdk.interfaces.IBond$Order",,"DOUBLE")
  triple  <- .jfield("org.openscience.cdk.interfaces.IBond$Order",,"TRIPLE")
  
  # AtomContainer
  mol <- .jnew("org.openscience.cdk.AtomContainer")
  
  # Add Atoms
  atoms <- lapply(moljson$a, createAtom)
  for (atom in atoms) {
    mol$addAtom(atom) 
  }
  
  # Add Bonds
  for (bond in moljson$b){
    # Note: each index has to be incremented by one becasue lists are 1-indexed
    beginindex <- bond$b + 1
    endindex   <- bond$b + 1
    bondorder  <- bond$o
    newbond    <- new(Bond, atoms[[beginindex]], atoms[[endindex]])
    if (is.null(bondorder)) bondorder <- 1
    if (bondorder == 1) newbond$setOrder(single)
    if (bondorder == 2) newbond$setOrder(double)
    if (bondorder == 3) newbond$setOrder(triple)
    mol$addBond(newbond)
  }
  
  # Fix Implicit Hydrogens
  builder <- mol$getBuilder()
  matcher <- Matcher$getInstance(builder)
  
  for (i in 0:(mol$getAtomCount()-1)) {
    atm      <- mol$getAtom(i)
    atomtype <- matcher$findMatchingAtomType(mol, atm)
    Manipulator$configure(atm, atomtype)
  }
  adder <- AddHydrogen$getInstance(mol$getBuilder())
  adder$addImplicitHydrogens(mol)
  
  return(mol)
}

#' CDK AtomContainer to Smiles
#'
#' @export
toSmiles <- function(mol){
  Smiles  <- J("org.openscience.cdk.smiles.SmilesGenerator")
  smigen  <- new(Smiles)$unique()
  smigen$create(mol)
  return(smigen$create(mol))
}