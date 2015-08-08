var util = require("./util");

exports['test simple variable declaration'] = function() {
  util.assertOutline("var a, b ", {"outline":
    [
     {"name":"a","type":"?","start":4,"end":5},
     {"name":"b","type":"?","start":7,"end":8}
   ]
  });    
}

exports['test unkown variable declaration'] = function() {
  util.assertOutline("var a, b, ", {"outline":
    [
     {"name":"a","type":"?","start":4,"end":5},
     {"name":"b","type":"?","start":7,"end":8}
   ]
  });    
}

exports['test variable declaration with simple type'] = function() {
  util.assertOutline("var a=1, b='', c = [true], ", {"outline":
    [
     {"name":"a","type":"number","start":4,"end":5},
     {"name":"b","type":"string","start":9,"end":10},
     {"name":"c","type":"[bool]","start":15,"end":16}
   ]
  });    
}

if (module == require.main) require("test").run(exports);