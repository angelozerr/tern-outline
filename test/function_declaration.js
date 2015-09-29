var util = require("./util");

exports['test simple function declaration'] = function() {
  util.assertOutline("var a = function() {}", {"outline":
    [
     {"name":"a","type":"fn()","start":0,"end":21}
   ]
  });    
}

exports['test simple named function declaration'] = function() {
  util.assertOutline("function a() {}", {"outline":
    [
     {"name":"a","type":"fn()","start":0,"end":15}
   ]
  });    
}

exports['test simple named function declaration with body'] = function() {
  util.assertOutline("function a() {var i=10;}", {"outline":
    [
     {"name":"a","type":"fn()","start":0,"end":24,"children":
       [
        {"name":"i","type":"number","start":18,"end":19}
       ]
     }
   ]
  });    
}

exports['test simple function expression'] = function() {
  util.assertOutline("function b() { b(function a() {})}", {"outline":
    [
     {"name":"b","type":"fn()","start":0,"end":34,"children":
       [
        {"name":"a","type":"fn()","start":17,"end":32}
       ]
     }
   ]
  });    
}

if (module == require.main) require("test").run(exports);