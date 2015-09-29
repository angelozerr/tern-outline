exports['test variable declaration'] = require('./variable_declaration');
exports['test function declaration'] = require('./function_declaration');
exports['test object literal'] = require('./object_literal');
exports['test class declaration'] = require('./class_declaration');

if (require.main === module) require("test").run(exports);