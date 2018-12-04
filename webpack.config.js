const webpack = require('webpack');
const config = {
    entry: __dirname + '/App/static/js/index.jsx',
    output: {
        path: __dirname + '/App/static/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
module.exports = config;