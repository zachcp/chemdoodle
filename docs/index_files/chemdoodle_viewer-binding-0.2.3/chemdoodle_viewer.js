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
        var viewercanvas = new ChemDoodle.ViewerCanvas( canvas.id, x.width, x.height);

        viewercanvas.specs.bonds_saturationWidth_2D = 0.18;
        viewercanvas.specs.bonds_hashSpacing_2D = 2.5;
        viewercanvas.specs.backgroundColor = x.backgroundColor;
        viewercanvas.specs.scale = x.scale;
        // atom display info
        viewercanvas.specs.atoms_font_size_2D = x.atoms_font_size_2D;
        viewercanvas.specs.atoms_font_families_2D = x.atoms_font_families_2D;
        viewercanvas.specs.atoms_font_italic_2D = x.atoms_font_italic_2D;
        viewercanvas.specs.atoms_circleDiameter_2D = x.atoms_circleDiameter_2D;
        viewercanvas.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
        viewercanvas.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
        viewercanvas.specs.atoms_usePYMOLColors = x.atoms_usePYMOLColors;
        viewercanvas.specs.atoms_implicitHydrogens_2D = x.atoms_implicitHydrogens_2D;
        viewercanvas.specs.atoms_displayTerminalCarbonLabels_2D = x.atoms_displayTerminalCarbonLabels_2D;
        viewercanvas.specs.atoms_displayAllCarbonLabels_2D = x.atoms_displayAllCarbonLabels_2D;
        // bond display info
        viewercanvas.specs.bonds_display = x.bonds_display;
        viewercanvas.specs.bonds_width_2D = x.bonds_width_2D;
        viewercanvas.specs.bonds_saturationWidth_2D = x.bonds_saturationWidth_2D;
        viewercanvas.specs.bonds_ends_2D = x.bonds_ends_2D;
        viewercanvas.specs.bonds_useJMOLColors = x.bonds_useJMOLColors;
        viewercanvas.specs.bonds_usePYMOLColors = x.bonds_usePYMOLColors;
        viewercanvas.specs.bonds_wedgeThickness_2D = x.bonds_wedgeThickness_2D;
        viewercanvas.specs.bonds_hashWidth_2D = x.bonds_hashWidth_2D;
        viewercanvas.loadMolecule(mol);
    }
});
