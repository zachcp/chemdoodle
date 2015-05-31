#' ChemDoodle Viewer
#'
#' Widget that accepts a SMILES string and visualizes it using ChemDoodle
#'
#' @import htmlwidgets
#'
#' @export
chemdoodle <- function(smiles, width = 500, height = 500, bondscale=14.4) {

  # forward options using x
  x = list(
    width = width,
    height = height,
    json = smiles_to_json(smiles),
    bondscale = bondscale
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
