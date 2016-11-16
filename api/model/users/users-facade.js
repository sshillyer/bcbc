const Model = require('../../lib/facade');
const usersSchema  = require('./users-schema');


class UsersModel extends Model {}

module.exports = new UsersModel(usersSchema);
