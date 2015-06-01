#' ChemDoodle Viewer
#'
#' Widget that accepts a SMILES string and visualizes it using ChemDoodle
#'
#' @import htmlwidgets
#'
#' #: background color of the canvas, set this to undefined to create a see-through canvas
#' scale of the canvas, set this after the molecule has been loaded, then repaint the canvas
#'  atom text font size for 2D depiction
#'  the atom text font families, families cascade through the array if not found on the users computer; for 2D depiction
#'   atom text will be italicized
#'   diameter of atom circles for 2D depiction
#'    use Jmol colors for atoms
#'    use PyMOL colors for atoms, will default to Jmol if that specification is also true
#'    render implicit hydrogens on all labels that are visible
#'    show labels for terminal carbons
#'    show all carbon labels
#'     draw the bonds
#'     width of the bonds for 2D depiction; also controls the width of primitive lines for bonds rendered in WebGL scenes
#'     relative saturation width of double and triple bond lines for 2D depiction
#'     bond end style for 2D depiction Allowed Values: [butt, round, square],
#'     color the bond by using the Jmol colors of the connected atoms, the type of fill is controlled by the bonds_colorGradient specification
#'     color the bond by using the PyMOL colors of the connected atoms, the type of fill is controlled by the bonds_colorGradient specification, will default to Jmol if that specification is also true
#'     color the bond by using a gradient between the two colors of the constituent atoms, rather than by using a color split
#'     double bonds are drawn symmetrically always, instead of pointing towards the center of a ring, for instance; for 2D depiction
#'
#'
#' @export
chemdoodle <- function(smiles,
                       width = 500,
                       height = 500,
                       bondscale=14.4,
                       #canvas settings
                       backgroundColor="white",
                       scale= 1,
                       #atom settings
                       atoms_font_size_2D = 12,
                       atoms_font_families_2D = c("Helvetica", "Arial", "Dialog"),
                       atoms_font_italic_2D= FALSE,
                       atoms_circleDiameter_2D = 10,
                       atoms_useJMOLColors = FALSE,
                       atoms_usePYMOLColors = FALSE,
                       atoms_implicitHydrogens_2D = TRUE,
                       atoms_displayTerminalCarbonLabels_2D = TRUE,
                       atoms_displayAllCarbonLabels_2D = FALSE,
                       # bond specifications
                       bonds_display = TRUE,
                       bonds_width_2D = 1,
                       bonds_saturationWidth_2D = 0.2,
                       bonds_ends_2D = "round",
                       bonds_useJMOLColors = FALSE,
                       bonds_usePYMOLColors = FALSE,
                       bonds_wedgeThickness_2D = 0.22,
                       bonds_hashWidth_2D = 1) {

  # forward options using x
  x = list(
    width = width,
    height = height,
    json = smiles_to_json(smiles),
    bondscale = bondscale,
    backgroundColor="white",
    scale = scale,
    atoms_font_size_2D = atoms_font_size_2D,
    atoms_font_families_2D =atoms_font_families_2D,
    atoms_font_italic_2D = atoms_font_italic_2D,
    atoms_circleDiameter_2D = atoms_circleDiameter_2D,
    atoms_useJMOLColors = atoms_useJMOLColors,
    atoms_useJMOLColors = atoms_useJMOLColors,
    atoms_usePYMOLColors = atoms_usePYMOLColors,
    atoms_implicitHydrogens_2D = atoms_implicitHydrogens_2D,
    atoms_displayTerminalCarbonLabels_2D = atoms_displayTerminalCarbonLabels_2D,
    atoms_displayAllCarbonLabels_2D = atoms_displayAllCarbonLabels_2D,
    bonds_display = bonds_display,
    bonds_width_2D = bonds_width_2D,
    bonds_saturationWidth_2D = bonds_saturationWidth_2D,
    bonds_ends_2D = bonds_ends_2D,
    bonds_useJMOLColors = bonds_useJMOLColors,
    bonds_usePYMOLColors = bonds_usePYMOLColors,
    bonds_wedgeThickness_2D = bonds_wedgeThickness_2D,
    bonds_hashWidth_2D = bonds_hashWidth_2D
  )

  #modify JSON serialization
  attr(x, 'TOJSON_ARGS') <- list(dataframe=c("rows"))

  # create widget
  htmlwidgets::createWidget(
    name = 'chemdoodle',
    x = x,
    width = width,
    height = height,
    package = 'chemdoodle'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
chemdoodleOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'chemdoodle', width, height, package = 'chemdoodle')
}

#' Widget render function for use in Shiny
#'
#' @export
renderChemdoodle <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, chemdoodleOutput, env, quoted = TRUE)
}
