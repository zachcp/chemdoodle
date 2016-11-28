library(shiny)
library(miniUI)
library(chemdoodle)

# Super-Simple Shiny App that shows how chemdoodle can be sued within shiny.
# 
# Draw a molecule. When you hit the butotn, it will display the count of the molecules
# in the sketcher frame.
#


# shiny server function
#
server <- function(input, output) {
  
  #set a dummy reactive variable
  mol <- reactiveValues(moleculedata = NULL)
  
  #function to update the value based on changes on the shiny side
  observeEvent(input$moleculedata, {
    moljson <- input$moleculedata
    mol$moleculedata <- processChemDoodleJson(moljson)

  })
  
  # output function simply tallies the atom counts
  output$atomnumber <- renderText({
    if (is.null(mol$moleculedata)){
      return("Choose a Molecule and Click the Button!")
    } else {
      atomcount <- mol$moleculedata$getAtomCount()
      return(paste("This Molecule has",atomcount, "atoms."))
    }
  })
}


# Shiny UI Function
#
ui <- miniPage(
  
  mainPanel(h1(textOutput("atomnumber"))),
  
  miniContentPanel(chemdoodle_sketcher(mol=NULL)),
  
  gadgetTitleBar("Draw A Molecule", right = miniTitleBarButton("done", "Done", primary = TRUE)),
  
  tags$script('
              document.getElementById("done").onclick = function() {
              var mol = sketcher.getMolecule();
              var jsonmol = new ChemDoodle.io.JSONInterpreter().molTo(mol);
              Shiny.onInputChange("moleculedata", jsonmol);};'
  ))


#' Call the Widget
#'
shinyApp(ui = ui, server = server)