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

function createSHA(password, salt) {
    var hash = sha256(password + salt);
    return hash;
}

function validateSHA(hash, password, salt) {
    var validHash = sha256(password + salt);
    return hash === validHash;
}

function sha256(inputString){
    return crypto.createHash('sha256')
   .update(inputString)
   .digest('base64');
}

module.exports = {
    'hash': createHash,
    'validate': validateHash,
    'createSHA': createSHA,
    'validateSHA':validateSHA
};