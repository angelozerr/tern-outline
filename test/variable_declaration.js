var util = require("./util");

exports['test simple variable declaration'] = function() {
  util.assertOutline("var a, b ", {"outline":
    [
     {"name":"a","type":"VariableDeclaration","start":4,"end":5},
     {"name":"b","type":"VariableDeclaration","start":7,"end":8}
   ]
  });    
}

exports['test unkown variable declaration'] = function() {
  util.assertOutline("var a, b, ", {"outline":
    [
     {"name":"a","type":"VariableDeclaration","start":4,"end":5},
     {"name":"b","type":"VariableDeclaration","start":7,"end":8}
   ]
  });    
}

if (module == require.main) require("test").run(exports);