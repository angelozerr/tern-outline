var util = require("./util");

exports['test simple object literal declaration'] = function() {
  util.assertOutline("var o = {p1: '', p2: 10, p3}", {"outline":
    [
     {"name":"o","type":"o","start":4,"end":5,"children":
       [
         {"name":"p1","type":"string","start":9,"end":11},
         {"name":"p2","type":"number","start":17,"end":19},
         {"name":"p3","type":"?","start":25,"end":27}
       ]
     }
   ]
  });    
}

exports['test object literal with function property declaration'] = function() {
  util.assertOutline("var o = {f: function() {var i = 10}}", {"outline":
    [
     {"name":"o","type":"o","start":4,"end":5,"children":
       [
         {"name":"f","type":"fn()","start":9,"end":10, "children":
           [
             {"name":"i","type":"number","start":28,"end":29}
           ]
         }         
       ]
     }
   ]
  });    
}

if (module == require.main) require("test").run(exports);