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
        var mol = x.json;
        
        var viewercanvas = new ChemDoodle.ViewerCanvas("viewer", x.width, x.height);
        viewercanvas.specs.bonds_width_2D = 0.6;
        viewercanvas.specs.bonds_saturationWidth_2D = 0.18;
        viewercanvas.specs.bonds_hashSpacing_2D = 2.5;
        viewercanvas.specs.atoms_font_size_2D = 10;
        viewercanvas.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
        viewercanvas.specs.atoms_displayTerminalCarbonLabels_2D = true;
        var caffeineMolFile = 'Molecule Name\n  CHEMDOOD08070920033D 0   0.00000     0.00000     0\n[Insert Comment Here]\n 14 15  0  0  0  0  0  0  0  0  1 V2000\n   -0.3318    2.0000    0.0000   O 0  0  0  1  0  0  0  0  0  0  0  0\n   -0.3318    1.0000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -1.1980    0.5000    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n    0.5342    0.5000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -1.1980   -0.5000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -2.0640    1.0000    0.0000   C 0  0  0  4  0  0  0  0  0  0  0  0\n    1.4804    0.8047    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n    0.5342   -0.5000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -2.0640   -1.0000    0.0000   O 0  0  0  1  0  0  0  0  0  0  0  0\n   -0.3318   -1.0000    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n    2.0640   -0.0000    0.0000   C 0  0  0  2  0  0  0  0  0  0  0  0\n    1.7910    1.7553    0.0000   C 0  0  0  4  0  0  0  0  0  0  0  0\n    1.4804   -0.8047    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n   -0.3318   -2.0000    0.0000   C 0  0  0  4  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  3  2  1  0  0  0  0\n  4  2  1  0  0  0  0\n  3  5  1  0  0  0  0\n  3  6  1  0  0  0  0\n  7  4  1  0  0  0  0\n  4  8  2  0  0  0  0\n  9  5  2  0  0  0  0\n 10  5  1  0  0  0  0\n 10  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  7 12  1  0  0  0  0\n 13  8  1  0  0  0  0\n 13 11  2  0  0  0  0\n 10 14  1  0  0  0  0\nM  END\n> <DATE>\n07-08-2009\n';
        var caffeine = ChemDoodle.readMOL(caffeineMolFile);  
        caffeine.scaleToAverageBondLength(14.4);
        viewercanvas.loadMolecule(caffeine);
        
        
        var viewercanvas1 = new ChemDoodle.ViewerCanvas("viewer1", x.width, x.height);
        viewercanvas1.specs.bonds_width_2D = 0.6;
        viewercanvas1.specs.bonds_saturationWidth_2D = 0.18;
        viewercanvas1.specs.bonds_hashSpacing_2D = 2.5;
        viewercanvas1.specs.atoms_font_size_2D = 10;
        viewercanvas1.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
        viewercanvas1.specs.atoms_displayTerminalCarbonLabels_2D = true;
        console.log(mol);
        var mol = new ChemDoodle.io.JSONInterpreter().molFrom(x.json);
        console.log(mol);
        viewercanvas1.loadMolecule(mol);
        console.log(mol);
        el.innerText = x.message;
        el.innerText = x.json;
        
        
        
        
    },
    

    
});
