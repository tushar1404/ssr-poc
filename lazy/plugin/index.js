module.exports = function(babel) {
    return {
      visitor: {
        ImportSpecifier(path) {
            if(path.node.imported.name == "Suspense" && path.parent.source.value == "react"){
                let currentNode = path.node
                path.parent.specifiers = path.parent.specifiers.filter(function(v){return v != currentNode})
                path.parentPath.insertAfter(babel.types.importDeclaration([currentNode], babel.types.stringLiteral(process.cwd() + '/lazy/components') ) )
            }
        }
      }
    };
};