module.exports = {
    rootClasses: () => /class\s+([A-Za-z0-9]+)\s*\{/g,
    childClasses: (rootClassName) => new RegExp(`class\\s+([A-Za-z0-9]+)\\s+extends\\s+${rootClassName}\\s*{`, 'g'),
    class: (className) => new RegExp(`class\\s+${className}(\\s+[a-z]+\\s+[A-Za-z0-9]+)?\\s*{`, 'g'),
    method: () => /([A-Za-z0-9]+)\s*=?\s*\([A-Za-z0-9\s,]*\)\s*(=>)?\s*\{/g,
    attributes: () => /([A-Za-z0-9]+)\s*=[^\(]/g
};