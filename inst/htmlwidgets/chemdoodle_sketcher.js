HTMLWidgets.widget({

  name: 'chemdoodle_sketcher',

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
    //sketcher cnavas defined in chemdoodle_sketcher.R
    //  we attached it to el
    
    var sketchercanvas = el.sketcher;

    sketchercanvas.specs.bonds_saturationWidth_2D = 0.18;
    sketchercanvas.specs.bonds_hashSpacing_2D = 2.5;
    sketchercanvas.specs.backgroundColor = x.backgroundColor;
    sketchercanvas.specs.scale = x.scale;
    // atom display info
    sketchercanvas.specs.atoms_font_size_2D = x.atoms_font_size_2D;
    sketchercanvas.specs.atoms_font_families_2D = x.atoms_font_families_2D;
    sketchercanvas.specs.atoms_font_italic_2D = x.atoms_font_italic_2D;
    sketchercanvas.specs.atoms_circleDiameter_2D = x.atoms_circleDiameter_2D;
    sketchercanvas.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
    sketchercanvas.specs.atoms_useJMOLColors = x.atoms_useJMOLColors;
    sketchercanvas.specs.atoms_usePYMOLColors = x.atoms_usePYMOLColors;
    sketchercanvas.specs.atoms_implicitHydrogens_2D = x.atoms_implicitHydrogens_2D;
    sketchercanvas.specs.atoms_displayTerminalCarbonLabels_2D = x.atoms_displayTerminalCarbonLabels_2D;
    sketchercanvas.specs.atoms_displayAllCarbonLabels_2D = x.atoms_displayAllCarbonLabels_2D;
    // bond display info
    sketchercanvas.specs.bonds_display = x.bonds_display;
    sketchercanvas.specs.bonds_width_2D = x.bonds_width_2D;
    sketchercanvas.specs.bonds_saturationWidth_2D = x.bonds_saturationWidth_2D;
    sketchercanvas.specs.bonds_ends_2D = x.bonds_ends_2D;
    sketchercanvas.specs.bonds_useJMOLColors = x.bonds_useJMOLColors;
    sketchercanvas.specs.bonds_usePYMOLColors = x.bonds_usePYMOLColors;
    sketchercanvas.specs.bonds_wedgeThickness_2D = x.bonds_wedgeThickness_2D;
    sketchercanvas.specs.bonds_hashWidth_2D = x.bonds_hashWidth_2D;
    sketchercanvas.repaint();

  }
});
