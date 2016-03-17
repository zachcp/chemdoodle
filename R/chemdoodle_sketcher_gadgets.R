#' Initiates the ChemDoodle Sketcher 
#'
#' helpful website:https://ryouready.wordpress.com/2013/11/20/sending-data-from-client-to-server-and-back-using-shiny/
#' 
#' @import shiny
#' @import miniUI
#' @export
drawMolecule <- function(width=600, height=600) {
  
  ui <- miniPage(
    miniContentPanel(chemdoodle_sketcher()),
    
    gadgetTitleBar("Draw A Molecule", right = miniTitleBarButton("done", "Done", primary = TRUE)),

    tags$script('
document.getElementById("done").onclick = function() {
var mol = sketcher.getMolecule();
var jsonmol = new ChemDoodle.io.JSONInterpreter().molTo(mol);
Shiny.onInputChange("moleculedata", jsonmol);};')
    )

  server <- function(input, output, session) {
    observeEvent(input$done, { stopApp(input$moleculedata) })
  }
  
  runGadget(ui, 
            server, 
            viewer =  dialogViewer("Draw A Molecule", 
                                   width = width, 
                                   height = height))
}