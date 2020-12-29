const fs = require('fs');
const path = require('path');

const libPath = process.argv[2];
const filesData = [];

const readDirectoryContent = () => {
    fs.readdirSync(libPath).forEach(filePath =>
        filesData.push(fs.readFileSync(path.join(libPath, filePath), 'utf-8'))
    );
};

module.exports = {
    readDirectoryContent,
    filesData
};