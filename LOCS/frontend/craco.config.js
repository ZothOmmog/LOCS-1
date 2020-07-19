const path = require('path');
const { alias } = require('./src/lib');

const aliasForCraco = {}

for(let key in alias) {
  aliasForCraco[key] = path.resolve(
    __dirname, 
    './src/' + alias[key]
  );
}

module.exports = {
  webpack: { alias: { ...aliasForCraco } }
};
