const rgxp = require('./regexp');
const { findClassesByRegexp } = require('./utils');

function calculateDepthOfInheritanceTree(className, depth = 1) {
    const childClasses = findClassesByRegexp(rgxp.childClasses(className));
    let depthOnLevel = depth;
    childClasses.forEach(childClassName => {
        const childClassDepth = calculateDepthOfInheritanceTree(childClassName, depth + 1);
        if (childClassDepth > depthOnLevel) depthOnLevel = childClassDepth;
    });
    return depthOnLevel;
}

function calculateNumberOfChildren(className) {
    const childClasses = findClassesByRegexp(rgxp.childClasses(className));
    let amount = childClasses.length;
    if (amount) {
        childClasses.forEach(childClassName =>
            amount += calculateNumberOfChildren(childClassName)
        );
    }
    return amount;
}

module.exports = {
    calculateDepthOfInheritanceTree,
    calculateNumberOfChildren
};