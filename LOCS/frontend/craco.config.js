const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { alias } = require('./src/lib');

const aliasForCraco = {};

for (let key in alias) {
    aliasForCraco[key] = path.resolve(__dirname, './src/' + alias[key]);
}

module.exports = {
    webpack: {
        alias: { ...aliasForCraco },
        // plugins: [
        //     new CircularDependencyPlugin({
        //         // exclude detection of files based on a RegExp
        //         exclude: /a\.js|node_modules/,
        //         // include specific files based on a RegExp
        //         include: /dir/,
        //         // add errors to webpack instead of warnings
        //         failOnError: true,
        //         // allow import cycles that include an asyncronous import,
        //         // e.g. via import(/* webpackMode: "weak" */ './file.js')
        //         allowAsyncCycles: false,
        //         // set the current working directory for displaying module paths
        //         cwd: process.cwd(),
        //     }),
        // ],
        optimization: {
            namedModules: false
        }
    },
};
