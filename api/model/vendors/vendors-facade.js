const Model = require('../../lib/facade');
const vendorsSchema  = require('./vendors-schema');


class VendorsModel extends Model {}

module.exports = new VendorsModel(vendorsSchema);
