module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'react-hot-loader/webpack!babel-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
        ]
    },
    devtool: 'source-map',
    mode: 'development'
}