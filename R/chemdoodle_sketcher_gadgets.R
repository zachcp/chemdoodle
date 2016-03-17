#library(shiny)
#library(miniUI)
# library(shinyjs)

# jsCode <- 'shinyjs.getmoleculedata = function() {
# var mol = sketcher.getMolecule();
# var jsonmol = new ChemDoodle.io.JSONInterpreter().molTo(mol);
# alert(jsonmol);
# Shiny.onInputChange("moleculedata", jsonmol);
# }'

#' sketcher
#'
#' helpful:https://ryouready.wordpress.com/2013/11/20/sending-data-from-client-to-server-and-back-using-shiny/
#' @import shiny
#' @import miniUI
#' 
#' @export
drawMolecule <- function() {
  
  ui <- miniPage(
  
    gadgetTitleBar("Draw A Molecule",
                   right = miniTitleBarButton("done", "Done", primary = TRUE)),
    miniContentPanel(chemdoodle_sketcher()),
    actionButton("getdata","Get Molecule Data"),
    #extendShinyjs(text = jsCode),
    
    tags$script('
document.getElementById("getdata").onclick = function() {
var mol = sketcher.getMolecule();
var jsonmol = new ChemDoodle.io.JSONInterpreter().molTo(mol);
alert(jsonmol);
Shiny.onInputChange("moleculedata", jsonmol);};')
    )

  server <- function(input, output, session) {
    observe(input$moleculedata)
    
    observeEvent(input$done, {
      #js$getmoleculedata()
      stopApp(input$moleculedata) })
  }
  
  runGadget(ui, server)
}