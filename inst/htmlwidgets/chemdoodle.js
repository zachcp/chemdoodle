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
        var viewercanvas = new ChemDoodle.ViewerCanvas(canvasId, x.width, x.height);
        viewercanvas.specs.bonds_width_2D = 0.6;
        viewercanvas.specs.bonds_saturationWidth_2D = 0.18;
        viewercanvas.specs.bonds_hashSpacing_2D = 2.5;
        viewercanvas.specs.atoms_font_size_2D = 10;
        viewercanvas.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
        viewercanvas.specs.atoms_displayTerminalCarbonLabels_2D = true;
        viewercanvas.loadMolecule(mol);
    }
});
