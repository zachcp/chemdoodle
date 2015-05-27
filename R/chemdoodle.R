#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
chemdoodle <- function(message, width = NULL, height = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'chemdoodle',
    x,
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
