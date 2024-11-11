const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const jsx = require('acorn-jsx'); // Import acorn-jsx for JSX parsing
const stage3 = require('acorn-stage3'); // Import acorn-stage3 for latest syntax support

// Recursively scan for JS/JSX files in all subdirectories
function scanDirectory(dir) {
    let components = [];

    // Read all files and directories within the current directory
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);

        // If it's a directory, scan it recursively
        if (fs.statSync(fullPath).isDirectory()) {
            components = components.concat(scanDirectory(fullPath));
        }

        // If it's a .js or .jsx file, add it to the components array
        else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            components.push(fullPath);
        }
    });

    return components;
}

// Parse each component and extract interactions
function analyzeComponent(file) {
    const content = fs.readFileSync(file, 'utf-8');

    // Use acorn with JSX and stage-3 support to parse the content
    const ast = acorn.Parser.extend(jsx(), stage3).parse(content, {
        sourceType: 'module',
        ecmaVersion: 2020, // Adjust ECMAScript version if needed
    });

    const imports = [];
    ast.body.forEach(node => {
        if (node.type === 'ImportDeclaration') {
            imports.push(node.source.value); // Collect imported module paths
        }
    });
    return { file, imports };
}

// Generate PlantUML syntax from parsed data
function generatePlantUML(components) {
    const umlLines = ['@startuml', 'actor User'];
    components.forEach(({ file, imports }) => {
        const componentName = path.basename(file, path.extname(file));
        umlLines.push(`participant ${componentName}`);
        imports.forEach(imported => {
            const importedName = path.basename(imported, path.extname(imported));
            umlLines.push(`${componentName} -> ${importedName}: renders`);
        });
    });
    umlLines.push('@enduml');
    return umlLines.join('\n');
}

// Run the script starting from the current working directory
const components = scanDirectory(process.cwd());  // Use current working directory
const analyzedComponents = components.map(analyzeComponent);
const umlSyntax = generatePlantUML(analyzedComponents);
fs.writeFileSync('diagram.puml', umlSyntax);
console.log('PlantUML file generated: diagram.puml');
