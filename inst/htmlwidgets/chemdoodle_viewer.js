HTMLWidgets.widget({

    name: 'chemdoodle_viewer',

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
        var id = el.id;
        // remove any previously created canvas element
        el.innerHTML = "";

        // make a canvas with the correct Id
        var canvasId = id + "-canvas";
        var canvas = document.createElement("canvas");
        canvas.id = canvasId;
        canvas.width = el.offsetWidth;
        canvas.height = el.offsetHeight;
        el.appendChild(canvas);

        //Load And Scale Molecule
        var mol = new ChemDoodle.io.JSONInterpreter().molFrom( x.json );
        mol.scaleToAverageBondLength( x.bondscale );

        //Create Canvas Element
        var viewercanves = new ChemDoodle.ViewerCanvas("viewer2", x.width, x.height);

        viewercanves.specs.bonds_saturationWidth_2D = 0.18;
        viewercanves.specs.bonds_hashSpacing_2D = 2.5;
        viewercanves.specs.backgroundColor = x.backgroundColor;
        viewercanves.specs.scale = x.scale;
        // atom display info
        viewercanves.specs.atoms_font_size_2D = x.atoms_font_size_2D;
        viewercanves.specs.atoms_font_families_2D = x.atoms_font_families_2D;
        viewercanves.specs.atoms_font_italic_2D = x.atoms_font_italic_2D;
        viewercanves.specs.atoms_circleDiameter_2D = x.atoms_circleDiameter_2D;
        viewercanves.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
        viewercanves.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
        viewercanves.specs.atoms_usePYMOLColors = x.atoms_usePYMOLColors;
        viewercanves.specs.atoms_implicitHydrogens_2D = x.atoms_implicitHydrogens_2D;
        viewercanves.specs.atoms_displayTerminalCarbonLabels_2D = x.atoms_displayTerminalCarbonLabels_2D;
        viewercanves.specs.atoms_displayAllCarbonLabels_2D = x.atoms_displayAllCarbonLabels_2D;
        // bond display info
        viewercanves.specs.bonds_display = x.bonds_display;
        viewercanves.specs.bonds_width_2D = x.bonds_width_2D;
        viewercanves.specs.bonds_saturationWidth_2D = x.bonds_saturationWidth_2D;
        viewercanves.specs.bonds_ends_2D = x.bonds_ends_2D;
        viewercanves.specs.bonds_useJMOLColors = x.bonds_useJMOLColors;
        viewercanves.specs.bonds_usePYMOLColors = x.bonds_usePYMOLColors;
        viewercanves.specs.bonds_wedgeThickness_2D = x.bonds_wedgeThickness_2D;
        viewercanves.specs.bonds_hashWidth_2D = x.bonds_hashWidth_2D;
        viewercanves.loadMolecule(mol);

    }
});
