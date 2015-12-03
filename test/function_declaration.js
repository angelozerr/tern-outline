var util = require("./util");

exports['test simple function declaration'] = function() {
  util.assertOutline("var a = function() {}", {"outline":
    [
     {"name":"a","type":"fn()","start":4,"end":5}
   ]
  });    
}

exports['test simple named function declaration'] = function() {
  util.assertOutline("function a() {}", {"outline":
    [
     {"name":"a","type":"fn()","start":9,"end":10}
   ]
  });    
}

exports['test simple named function declaration with body'] = function() {
  util.assertOutline("function a() {var i=10;}", {"outline":
    [
     {"name":"a","type":"fn()","start":9,"end":10,"children":
       [
        {"name":"i","type":"number","start":18,"end":19}
       ]
     }
   ]
  });    
}

exports['test simple named function declaration with body function'] = function() {
  util.assertOutline("function a() {var i=10; function b() {}}", {"outline":
    [
     {"name":"a","type":"fn()","start":9,"end":10,"children":
       [
        {"name":"i","type":"number","start":18,"end":19},
        {"name":"b","type":"fn()","start":33,"end":34}
       ]
     }
   ]
  });    
}

exports['test simple function expression'] = function() {
  util.assertOutline("function b() { b(function a() {})}", {"outline":
    [
     {"name":"b","type":"fn()","start":9,"end":10,"children":
       [
        {"name":"a","type":"fn()","start":26,"end":27}
       ]
     }
   ]
  });    
}

exports['test anonymous function'] = function() {
  util.assertOutline("function() {}", {"outline":
    [
     {"name":"<anonymous>","type":"fn()","start":11,"end":13}
   ]
  });    
}

if (module == require.main) require("test").run(exports);