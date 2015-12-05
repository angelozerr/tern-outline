var util = require("../util");

exports['test ES6 module import'] = function() {
  util.assertOutline("import {List} from './list'",
    {"outline":
      [{"type":"?","start":0,"end":27,"kind":"import",
        "children":[{"name":"List","type":"?","start":8,"end":12,"kind":"specifier"}]
      }]});    
}


if (module == require.main) require("test").run(exports);