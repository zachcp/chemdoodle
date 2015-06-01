HTMLWidgets.widget({

    name: 'chemdoodle',

    type: 'output',

    initialize: function(el, width, height, data) {
        //return the canvas as part of the viewer data
        return {
            // TODO: add instance fields as required
        }
    },

    resize: function(el, width, height, instance) {
       //if (instance.chemdoodle)
       //   instance.chemdoodle.resize();
    },

    renderValue: function(el, x, instance) {
        //Check Data
        var y = x;
        console.log(y);

        //Load And Scale Molecule
        var mol = new ChemDoodle.io.JSONInterpreter().molFrom( x.json );
        mol.scaleToAverageBondLength( x.bondscale );

        //Create Canvas Element
        var viewercanvas1 = new ChemDoodle.ViewerCanvas("viewer2", x.width, x.height);

        viewercanvas1.specs.bonds_saturationWidth_2D = 0.18;
        viewercanvas1.specs.bonds_hashSpacing_2D = 2.5;
        viewercanvas1.specs.backgroundColor = x.backgroundColor;
        viewercanvas1.specs.scale = x.scale;
        // atom display info
        viewercanvas1.specs.atoms_font_size_2D = x.atoms_font_size_2D;
        viewercanvas1.specs.atoms_font_families_2D = x.atoms_font_families_2D;
        viewercanvas1.specs.atoms_font_italic_2D = x.atoms_font_italic_2D;
        viewercanvas1.specs.atoms_circleDiameter_2D = x.atoms_circleDiameter_2D;
        viewercanvas1.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
        viewercanvas1.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
        viewercanvas1.specs.atoms_usePYMOLColors = x.atoms_usePYMOLColors;
        viewercanvas1.specs.atoms_implicitHydrogens_2D = x.atoms_implicitHydrogens_2D;
        viewercanvas1.specs.atoms_displayTerminalCarbonLabels_2D = x.atoms_displayTerminalCarbonLabels_2D;
        viewercanvas1.specs.atoms_displayAllCarbonLabels_2D = x.atoms_displayAllCarbonLabels_2D;
        // bond display info
        viewercanvas1.specs.bonds_display = x.bonds_display;
        viewercanvas1.specs.bonds_width_2D = x.bonds_width_2D;
        viewercanvas1.specs.bonds_saturationWidth_2D = x.bonds_saturationWidth_2D;
        viewercanvas1.specs.bonds_ends_2D = x.bonds_ends_2D;
        viewercanvas1.specs.bonds_useJMOLColors = x.bonds_useJMOLColors;
        viewercanvas1.specs.bonds_usePYMOLColors = x.bonds_usePYMOLColors;
        viewercanvas1.specs.bonds_wedgeThickness_2D = x.bonds_wedgeThickness_2D;
        viewercanvas1.specs.bonds_hashWidth_2D = x.bonds_hashWidth_2D;
        viewercanvas1.loadMolecule(mol);


        //Create Canvas Element
        if (instance.chemdoodle){
          instance.chemdoodle.specs.bonds_width_2D = 0.6;
        instance.chemdoodle.specs.bonds_saturationWidth_2D = 0.18;
        instance.chemdoodle.specs.bonds_hashSpacing_2D = 2.5;
        instance.chemdoodle.specs.atoms_font_size_2D = 10;
        instance.chemdoodle.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
        instance.chemdoodle.specs.atoms_displayTerminalCarbonLabels_2D = true;
        instance.chemdoodle.loadMolecule(mol);

        }


    }
});
