exports['test variable declaration'] = require('./variable_declaration');
exports['test function declaration'] = require('./function_declaration');
exports['test object literal'] = require('./object_literal');

if (require.main === module) require("test").run(exports);