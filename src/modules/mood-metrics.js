const rgxp = require('./regexp');
const {
    countNumberOfClassesWithMethod,
    countNumberOfClassesWithAttribute,
    findClassContent,
    findAttributesByRegexp,
    findMethodsByRegexp,
    findClassesByRegexp
} = require('./utils');

function calculateFactors(className) {
    const classContent = findClassContent(className);
    const classMethods = findMethodsByRegexp(classContent);
    const classAttributes = findAttributesByRegexp(classContent);
    const childClasses = findClassesByRegexp(rgxp.childClasses(className));
    if (!classMethods) return;
    childClasses.forEach((childClass, childClassIndx) => {
        const childClassContent = findClassContent(childClass);
        const childClassMethods = findMethodsByRegexp(childClassContent);
        const childClassAttributes = findAttributesByRegexp(childClassContent);
        const otherChildClasses = childClasses.slice();
        otherChildClasses.splice(childClassIndx, 1);
        console.log('---Child class', childClass);
        console.log('------MIF:', calculateMIF(classMethods, childClassMethods).toFixed(2));
        console.log('------AIF:', calculateAIF(classAttributes, childClassAttributes).toFixed(2));
        console.log('------MHF:', calculateMHF(otherChildClasses, childClassMethods).toFixed(2));
        console.log('------AHF:', calculateAHF(otherChildClasses, childClassAttributes).toFixed(2));
        console.log('------POF:', calculatePOF(classMethods, childClassMethods, childClasses).toFixed(2));
        calculateFactors(childClass);
    });
}

function calculateMIF(classMethods, childClassMethods) {
    if (!childClassMethods || !childClassMethods.length) return 0;
    const inheritedMethods = childClassMethods.filter(method => classMethods.includes(method));
    return inheritedMethods.length / childClassMethods.length;
}

function calculateAIF(classAttributes, childClassAttributes) {
    if (!childClassAttributes || !childClassAttributes.length) return 0;
    const inheritedAttributes = childClassAttributes.filter(attr => classAttributes.includes(attr));
    return inheritedAttributes.length / childClassAttributes.length;
}

function calculateMHF(otherChildClasses, childClassMethods) {
    if (!otherChildClasses || !childClassMethods ||
        !childClassMethods.length || !otherChildClasses.length) return 0;
    let mv = 0;
    childClassMethods.forEach(method => mv += countNumberOfClassesWithMethod(otherChildClasses, method));
    const c = otherChildClasses.length + 1;
    const numberOfMethods = childClassMethods.length;
    return mv / (c - 1) / numberOfMethods;
}

function calculateAHF(otherChildClasses, childClassAttributes) {
    if (!otherChildClasses || !childClassAttributes ||
        !otherChildClasses.length || !childClassAttributes.length) return 0;
    let av = 0;
    childClassAttributes.forEach(attr => av += countNumberOfClassesWithAttribute(otherChildClasses, attr));
    const c = otherChildClasses.length + 1;
    const numberOfAttributes = childClassAttributes.length;
    return av / (c - 1) / numberOfAttributes;
}

function calculatePOF(classMethods, childClassMethods, childClasses) {
    if (!childClassMethods || !childClassMethods.length || !childClasses.length) return 0;
    const inheritedMethods = childClassMethods.filter(method => classMethods.includes(method));
    return inheritedMethods.length / (childClassMethods.length * childClasses.length);
}

module.exports = {
    calculateFactors
};