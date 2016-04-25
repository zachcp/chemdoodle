# ChemDoodle WebComponents plus HTMLWidgets

This repo is for the creation of an HTMLWidget for visualizing
moleules based on the [ChemDoodle WebComponent](http://web.chemdoodle.chttps://github.com/rajarshi/cdkr/tree/master/rcdkom/) library,
the [HTMLWidgets](http://www.htmlwidgets.org/) package, and the
[Chemistry Development Kit](https://github.com/cdk) via [rCDK]()

Warning: development in flux and liable to break before the release of 1.0!

```[R]
library(chemdoodle)

chemdoodle_viewer("C1CCCCC1")
chemdoodle_transform("C1CCCCC1")
chemdoodle_slideshow(c("C1CCCCC1", "CNCNCNC1CCCCC1"), 500,500, bondscale=15)
```

```[R]
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

```[R]
# you can also try a minimal shiny example
shiny::runApp(appDir = "examples/minimalshinyapp/")
```
