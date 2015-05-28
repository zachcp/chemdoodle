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
    message = message,
    width=width,
    height=height,
    json = smiles_to_json("CCC")
    #json = jsonlite::toJSON(list(m= c( a=(y=0,x=0))))
    
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
