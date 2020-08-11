const config = require('../../../DBsetings.json');
let pgp = require("pg-promise")( /*options*/ );
let db = pgp(config);

module.exports = {
    pgp,
    db
};