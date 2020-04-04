var crypto = require('crypto');

function createHash(password, salt) {
    var hash = md5(password + salt);
    return hash;
}

function validateHash(hash, password, salt) {
    var validHash = md5(password + salt);
    return hash === validHash;
}


function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

module.exports = {
    'hash': createHash,
    'validate': validateHash
};