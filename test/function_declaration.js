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

exports['test all function case'] = function() {
  
  util.assertOutline("function f() {var i=0;}", {"outline":
    [
     {"name":"f","type":"fn()","start":9,"end":10,"children":
       [
        {"name":"i","type":"number","start":18,"end":19}
       ]           
     }
   ]
  });
  
  util.assertOutline("var f = function () {var i=0;}", {"outline":
    [
     {"name":"f","type":"fn()","start":4,"end":5,"children":
       [
        {"name":"i","type":"number","start":25,"end":26}
       ]           
     }
   ]
  });
  
  util.assertOutline("function g() {this.f = function () {var i=0;}}", {"outline":
    [
     {"name":"g","type":"fn()","start":9,"end":10,"children":
       [
        {"name":"f","type":"?","start":19,"end":20,"children":
          [
           {"name":"i","type":"number","start":40,"end":41}
          ]           
        }
       ]
     }
   ]
  }); 

  util.assertOutline("var o = {'f': function () {var i=0;}}", {"outline":
    [
     {"name":"o","type":"o","start":4,"end":5,"children":
       [
        {"name":"f","type":"fn()","start":9,"end":12,"children":
          [
           {"name":"i","type":"number","start":31,"end":32}
          ]           
        }
       ]
     }
   ]
  });
  
  util.assertOutline("class c {f() {var i=0;}}", {"outline":
    [
     {"name":"c","type":"fn()","start":6,"end":7,"kind": "class", "children":
       [
        {"name":"f","type":"fn()","start":9,"end":10,"kind": "method", "children":
          [
           {"name":"i","type":"number","start":18,"end":19}
          ]           
        }
       ]
     }
   ]
  });  
}

exports['test prototype properties function'] = function() {
  util.assertOutline("function Juan() {};Juan.prototype = Object.create(window);Juan.prototype.constructor = Juan;Juan.prototype.hello = function () {var j = 0;};", 
      {"outline":
        [{"name":"Juan","type":"fn()","start":9,"end":13,
          "children":[{"name":"prototype","type":"?","start":24,"end":33,
                       "children":[{"name":"constructor","type":"?","start":73,"end":84},
                                   {"name":"hello","type":"?","start":107,"end":112,
                                    "children":[{"name":"j","type":"number","start":132,"end":133}]
                                   }
                                  ]
                     }]
        }]}
   );    
}

if (module == require.main) require("test").run(exports);