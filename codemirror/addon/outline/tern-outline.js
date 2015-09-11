(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  
  function OutlineState(cm, options) {
    this.options = options;
    this.timeout = null;
  }
  
  function parseOptions(_cm, options) {
    if (options instanceof Function) return {getAnnotations: options};
    if (!options || options === true) options = {};
    return options;
  }
  
  function displayOutline(cm) {
    var state = cm.state.outline;
    if (!state) return;
    var server = CodeMirror.tern.getServer(cm);
    if (!server) return;
    
    var query = {
      type : "outline",
      file : "#0",
      lineCharPositions : true
    };
    
    var files = [];
    files.push({
      type : "full",
      name : "[doc]",
      text : cm.getValue()
    });

    var doc = {
      query : query,
      files : files
    };
    server.server.request(doc, function(error, response) {
      if (error) {
        updateOutline(state, {});
      } else {
        var outline = response;
        updateOutline(state, outline);
      }
    });
  }
  
  function updateOutline(state, outline) {
    var content = JSON.stringify(outline, null, ' ');
    if (state.options.node.value) {
      state.options.node.value = content 
    } else {
      state.options.node.innerHTML = content;
    }
  }
  
  function onChange(cm) {
    var state = cm.state.outline;
    if (!state) return;
    clearTimeout(state.timeout);
    state.timeout = setTimeout(function(){displayOutline(cm);}, state.options.delay || 500);
  }

  CodeMirror.defineOption("outline", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init) {
      cm.off("change", onChange);
    }
    if (val) {
      var state = cm.state.outline = new OutlineState(cm, parseOptions(cm, val));
      cm.on("change", onChange);
    }
    displayOutline(cm);
  });
  
});
  