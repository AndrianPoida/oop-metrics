const fileReader = require('./modules/file-reader');
const { findRootClasses } = require('./modules/utils');
const { calculateDepthOfInheritanceTree, calculateNumberOfChildren } = require('./modules/general-metrics');
const { calculateFactors } = require('./modules/mood-metrics');
fileReader.readDirectoryContent();

function main() {
    const rootClasses = findRootClasses();
    rootClasses.forEach(className => {
        console.log(`--Class: ${className}-----`);
        console.log('Depth of inheritance tree - ', calculateDepthOfInheritanceTree(className));
        console.log('Number of children - ', calculateNumberOfChildren(className));
        calculateFactors(className);
    });
}
main();