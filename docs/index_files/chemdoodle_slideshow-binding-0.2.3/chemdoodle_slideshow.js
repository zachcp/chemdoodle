HTMLWidgets.widget({

  name: 'chemdoodle_slideshow',

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

    //Create Canvas Element
    var slideshowcanvas = new ChemDoodle.SlideshowCanvas(canvas.id, x.width, x.height);

    slideshowcanvas.specs.bonds_saturationWidth_2D = 0.18;
    slideshowcanvas.specs.bonds_hashSpacing_2D = 2.5;
    slideshowcanvas.specs.backgroundColor = x.backgroundColor;
    slideshowcanvas.specs.scale = x.scale;
    // atom display info
    slideshowcanvas.specs.atoms_font_size_2D = x.atoms_font_size_2D;
    slideshowcanvas.specs.atoms_font_families_2D = x.atoms_font_families_2D;
    slideshowcanvas.specs.atoms_font_italic_2D = x.atoms_font_italic_2D;
    slideshowcanvas.specs.atoms_circleDiameter_2D = x.atoms_circleDiameter_2D;
    slideshowcanvas.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
    slideshowcanvas.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
    slideshowcanvas.specs.atoms_usePYMOLColors = x.atoms_usePYMOLColors;
    slideshowcanvas.specs.atoms_implicitHydrogens_2D = x.atoms_implicitHydrogens_2D;
    slideshowcanvas.specs.atoms_displayTerminalCarbonLabels_2D = x.atoms_displayTerminalCarbonLabels_2D;
    slideshowcanvas.specs.atoms_displayAllCarbonLabels_2D = x.atoms_displayAllCarbonLabels_2D;
    // bond display info
    slideshowcanvas.specs.bonds_display = x.bonds_display;
    slideshowcanvas.specs.bonds_width_2D = x.bonds_width_2D;
    slideshowcanvas.specs.bonds_saturationWidth_2D = x.bonds_saturationWidth_2D;
    slideshowcanvas.specs.bonds_ends_2D = x.bonds_ends_2D;
    slideshowcanvas.specs.bonds_useJMOLColors = x.bonds_useJMOLColors;
    slideshowcanvas.specs.bonds_usePYMOLColors = x.bonds_usePYMOLColors;
    slideshowcanvas.specs.bonds_wedgeThickness_2D = x.bonds_wedgeThickness_2D;
    slideshowcanvas.specs.bonds_hashWidth_2D = x.bonds_hashWidth_2D;

    //Load And Scale Molecule
    for (moljson in x.json) {
      var mol = new ChemDoodle.io.JSONInterpreter().molFrom( x.json[moljson] );
      mol.scaleToAverageBondLength( x.bondscale );
      console.log(mol);
      slideshowcanvas.addFrame([mol], []);
    }
    slideshowcanvas.startAnimation();

  }
});
