
<!-- README.md is generated from README.Rmd. Please edit that file -->

# chemdoodle

<!-- badges: start -->
<!-- badges: end -->

This repo is for the creation of an HTMLWidget for visualizing moleules
based on the [ChemDoodle
WebComponent](http://web.chemdoodle.chttps://github.com/rajarshi/cdkr/tree/master/rcdkom/)
library, the [HTMLWidgets](http://www.htmlwidgets.org/) package, and the
[Chemistry Development Kit](https://github.com/cdk) via
[rCDK](https://github.com/rajarshi/cdkr/tree/master/rcdk). **Warning:
development in flux and liable to break until version 1.0!**

### Install

And the development version from [GitHub](https://github.com/) with:

``` r
# install.packages("devtools")
# devtools::install_github("zachcp/chemdoodle")
```

### Basic Viewer

``` r
library(chemdoodle)
chemdoodle_viewer("C1CCCCC1", width = 100, height = 100)
```

### Transform Canvas

``` r
chemdoodle_transform("C1CCCCC1", width = 100, height = 100)
```

### Slideshow Canvas

``` r
chemdoodle_slideshow(c("C1CCCCC1", "CNCNCNC1CCCCC1", "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
                       "CC1=C(C=C(C2=C1C(=C)OC2=O)OC)OC"), 200,200, bondscale=15)
```

### Sketcher

The ChemDoodle Sketcher needs extra work for functionality. You can use
`drawMolecule()` to create a seketcher and the molecule is captured as
ChemDoodle JSON which can be converted to a CDK Atom and be passed
around, converter or whatever. Currently round-tripping (putting the
molecule back) doesn’t work because there are some issues around
properly scaling the compound.

``` r
#experimetal/new features

# gets a molecule from the chemdoodle sketcher
moljson <- drawMolecule()

# processed the Molecule JSON to a CDK AtomContainer - this can be saved,
# written to Smiles etc.
mol <- processChemDoodleJson(moljson)

# convert to SMILES
smi <- toSmiles(mol)

# convert to InChi
inchi <- toInChi(mol)

# try sending a molecule to the sketcher (needs work)
drawMolecule(mol=mol)
```

### Access the Sketcher as a ShinyApp

``` r
# you can also try a minimal shiny example
shiny::runApp(appDir = "examples/minimalshinyapp/")
```
