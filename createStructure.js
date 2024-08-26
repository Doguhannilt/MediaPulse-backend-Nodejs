const fs = require('fs');
const path = require('path');

const baseDirectory = __dirname;


const structure = {
    'config': ['database.js'],
    'controller': [],
    'middlewares': [],
    'models': ['userModel.js'],
    'routes': [],
    'utils': [],
    'index.js': []
};


function createDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
   
    }
}


function createFile(filePath, content = '') {
    fs.writeFileSync(filePath, content, 'utf8');
  
}


Object.keys(structure).forEach(folder => {
    const folderPath = path.join(baseDirectory, folder);

    if (Array.isArray(structure[folder])) {
 
        createDirectory(folderPath);

        structure[folder].forEach(file => {
            const filePath = path.join(folderPath, file);
            createFile(filePath);
        });
    } else {

        createFile(folderPath);
    }
});

console.log("Created.")
