library(shiny)
library(miniUI)
library(chemdoodle)

mol=NULL

miniPage(
  
  mainPanel(h1(textOutput("atomnumber"))),
  
  miniContentPanel(chemdoodle_sketcher(mol=mol)),
  
  gadgetTitleBar("Draw A Molecule", right = miniTitleBarButton("done", "Done", primary = TRUE)),
  
  tags$script('
document.getElementById("done").onclick = function() {
var mol = sketcher.getMolecule();
var jsonmol = new ChemDoodle.io.JSONInterpreter().molTo(mol);
Shiny.onInputChange("moleculedata", jsonmol);};'
))
