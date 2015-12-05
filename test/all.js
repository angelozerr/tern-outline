exports['test variable declaration'] = require('./variable_declaration');
exports['test function declaration'] = require('./function_declaration');
exports['test object literal'] = require('./object_literal');
// ES6 tests
exports['test ES6 class'] = require('./es6/class');
exports['test ES6 modules'] = require('./es6/modules');

if (require.main === module) require("test").run(exports);