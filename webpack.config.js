var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: './index.js',
    output: {
        path: './',
        filename: 'scripts.min.js'
    },
   resolve: {
        alias: {
            request$: "xhr"
        }
    ,}
}
