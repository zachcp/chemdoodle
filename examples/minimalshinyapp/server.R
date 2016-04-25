library(shiny)
library(chemdoodle)

shinyServer(function(input, output, session) {
  
  #set a dummy reavtie variable
  mol <- reactiveValues(moleculedata = NULL)
  
  #function to update the value based on changes on the shiny side
  observeEvent(input$moleculedata, {
    moljson <- input$moleculedata
    mol$moleculedata <- processChemDoodleJson(moljson)
    #print(input$moleculedata)
    #print(mol$moleculedata)
    #print(mol$moleculedata$getAtomCount())
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
})