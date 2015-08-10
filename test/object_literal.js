var util = require("./util");

exports['test simple function declaration'] = function() {
  util.assertOutline("var o = {p1: '', p2: 10, p3}", {"outline":
    [
     {"name":"o","type":"o","start":0,"end":28,"children":
       [
         {"name":"p1","type":"string","start":9,"end":11},
         {"name":"p2","type":"number","start":17,"end":19},
         {"name":"p3","type":"?","start":25,"end":27}
       ]
     }
   ]
  });    
}

if (module == require.main) require("test").run(exports);