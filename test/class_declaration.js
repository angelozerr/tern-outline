var util = require("./util");

exports['test simple class declaration'] = function() {
  util.assertOutline("class Cat { constructor(name) {"+
        "this.name = name;"+
      "}"+    
      "speak() {" +
        "console.log(this.name + ' makes a noise.');"+
      "}"+
    "}",
    {"outline":
      [{"name":"Cat","type":"fn(name: ?)","start":0,"end":103,"kind":"class",
        "children":[{"name":"constructor","type":"fn(name: ?)","start":12,"end":23,"kind":"constructor",
                     "children":[{"name":"name","type":"?","start":31,"end":40}]},
                    {"name":"speak","type":"fn()","start":49,"end":54,"kind":"method"}
                   ]}
      ]});    
}

exports['test simple class expression'] = function() {
  util.assertOutline("var cls = class {a(){} b(){}}",
    {"outline":
      [{"name":"cls","type":"fn()","start":4,"end":7,"kind":"class",
       "children": [{"name":"a","type":"fn()","start":17,"end":18,"kind":"method"},
                    {"name":"b","type":"fn()","start":23,"end":24,"kind":"method"}]
       }]
    });    
}

if (module == require.main) require("test").run(exports);