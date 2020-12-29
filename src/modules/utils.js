const rgxp = require('./regexp');
const { filesData } = require('./file-reader');

function findRootClasses() {
    const rootClasses = findClassesByRegexp(rgxp.rootClasses());
    return rootClasses;
}

function countNumberOfClassesWithMethod(childClasses, method) {
    let counter = 0;
    childClasses.forEach(childClass => {
        const childClassContent = findClassContent(childClass);
        const childClassMethods = findMethodsByRegexp(childClassContent);
        if (childClassMethods && childClassMethods.includes(method)) counter++;
    });
    return counter;
}

function countNumberOfClassesWithAttribute(childClasses, attr) {
    let counter = 0;
    childClasses.forEach(childClass => {
        const childClassContent = findClassContent(childClass);
        const childClassAttributes = findAttributesByRegexp(childClassContent);
        if (childClassAttributes && childClassAttributes.includes(attr)) counter++;
    });
    return counter;
}

function findClassContent(className) {
    for (const fileData of filesData) {
        const classInit = fileData.match(rgxp.class(className));
        if (classInit) {
            let bracketsOpened = 1;
            const slicedLeft = fileData.slice(fileData.indexOf(classInit) + classInit[0].length);
            let endIndx;
            for (const symbolIndx in slicedLeft) {
                if (slicedLeft[symbolIndx] === '{') bracketsOpened++;
                else if (slicedLeft[symbolIndx] === '}') bracketsOpened--;
                if (bracketsOpened === 0) {
                    endIndx = symbolIndx;
                    break;
                }
            }
            return slicedLeft.slice(0, endIndx).trim();
        }
    }
}

function findAttributesByRegexp(classContent) {
    const attributes = classContent.match(rgxp.attributes());
    const methods = findMethodsByRegexp(classContent);
    if (attributes) {
        return attributes.map(x => x.replace(rgxp.attributes(), '$1')).filter(x => !methods.includes(x));
    }
}

function findMethodsByRegexp(classContent) {
    const methods = classContent.match(rgxp.method())
    if (methods) {
        return methods.map(x => x.replace(rgxp.method(), '$1'));
    }
}

function findClassesByRegexp(rgxp) {
    let classes = [];
    filesData.forEach(fileData => {
        const foundClassesInFile = fileData.match(rgxp);
        if (foundClassesInFile) {
            classes = classes.concat(
                foundClassesInFile.map(x => x.replace(rgxp, '$1'))
            );
        }
    });
    return classes;
}

module.exports = {
    findRootClasses,
    countNumberOfClassesWithMethod,
    countNumberOfClassesWithAttribute,
    findClassContent,
    findAttributesByRegexp,
    findMethodsByRegexp,
    findClassesByRegexp
};