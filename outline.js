(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(exports, require("tern/lib/infer"), require("tern/lib/tern"), require("acorn/dist/walk"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["exports", "tern/lib/infer", "tern/lib/tern", "acorn/dist/walk"], mod);
  mod(root.tern || (root.tern = {}), tern, tern, acorn.walk);
})(this, function(exports, infer, tern, walk) {
  "use strict";

  function getNodeName(node) {
    if(node.callee) {
      // This is a CallExpression node.
      // We get the position of the function name.
      return getNodeName(node.callee);
    } else if(node.property) {
      // This is a MemberExpression node.
      // We get the name of the property.
      return getNodeName(node.property);
    } else if(node.id) {
      // This is a Function
      return getNodeName(node.id);
    } else {
      return node.name;
    }
  }

  function addChild(node, type, children) {
    if (!node || node.name == "✖") { return; }

    var child = {
        name: getNodeName(node),
        type: String(type || node.type),
        start: Number(node.start),
        end: Number(node.end)
    };
    children.push(child);
    return child;
  }
  
  function makeVisitors(server, query, file) {
    return {
      VariableDeclaration: function (node, scope) {
        for (var i = 0, len = node.declarations.length; i < len; i++) {
          var decl = node.declarations[i];
          if (decl.init && decl.init.type === 'FunctionExpression') {
            addChild(decl.id, 'FunctionDeclaration', scope);
          } else {
            addChild(decl.id, 'VariableDeclaration', scope);
          }
        }
      },
      MemberExpression: function (node, scope) {
        //console.log(node)
        /*collect(node.id, 'FunctionDeclaration');
        for (var i = 0, len = node.params.length; i < len; i++) {
          collect(node.params[i], 'ArgumentDeclaration');
        }*/
      }
    }
  }
  
  tern.registerPlugin("outline", function(server, options) {
    return {};
  });  
  
  // Adapted from infer.searchVisitor.
  // Record the scope and pass it through in the state.
  // VariableDeclaration in infer.searchVisitor breaks things for us.
  var scopeVisitor = walk.make({
    Function: function(node, parent, c) {
      var fn = addChild(node, "FunctionDeclaration", parent);
      var scope = fn.children = [];
      //var scope = node.body.scope;
      if (node.id) c(node.id, scope);
      for (var i = 0; i < node.params.length; ++i)
        c(node.params[i], scope);
      c(node.body, scope, "ScopeBody");
    }
  });

  // Other alternative bases:
  //   walk.base (no scope handling)
  //   infer.searchVisitor
  //   infer.fullVisitor
  var base = scopeVisitor;
  
  tern.defineQueryType("outline", {
    takesFile: true,
    run: function(server, query, file) {
      try {
        var outline = [], ast = file.ast;
        var visitors = makeVisitors(server, query, file);
        walk.simple(ast, visitors, base, outline);
        return {outline: outline};
      } catch(err) {
        console.error(err.stack);
        return {outline: []};
      }
    }
  });
  
  
})  