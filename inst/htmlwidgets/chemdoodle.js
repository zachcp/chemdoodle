HTMLWidgets.widget({

    name: 'chemdoodle',

    type: 'output',

    initialize: function(el, width, height, data) {
        //return the canvas as part of the viewer data
        var viewercanvas = new ChemDoodle.ViewerCanvas(el.id, width, height);

        return {
            // TODO: add instance fields as required
           chemdoodle: viewercanvas
        }
    },

    resize: function(el, width, height, instance) {
       if (instance.chemdoodle)
          instance.chemdoodle.resize();
    },

    renderValue: function(el, x, instance) {
        //Check Data
        // var y = x;
        //console.log(y);

        //Load And Scale Molecule
        var mol = new ChemDoodle.io.JSONInterpreter().molFrom( x.json );
        mol.scaleToAverageBondLength( x.bondscale );
        //console.log(mol);

        //Create Canvas Element
        var viewercanvas1 = new ChemDoodle.ViewerCanvas("viewer2", x.width, x.height);
        viewercanvas1.specs.bonds_width_2D = 0.6;
        viewercanvas1.specs.bonds_saturationWidth_2D = 0.18;
        viewercanvas1.specs.bonds_hashSpacing_2D = 2.5;
        viewercanvas1.specs.atoms_font_size_2D = 10;
        viewercanvas1.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
        viewercanvas1.specs.atoms_displayTerminalCarbonLabels_2D = true;
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
