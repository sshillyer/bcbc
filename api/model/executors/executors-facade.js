const Model = require('../../lib/facade');
const executorsSchema  = require('./executors-schema');


class ExecutorsModel extends Model {}

module.exports = new ExecutorsModel(executorsSchema);
