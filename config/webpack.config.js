var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:' + (process.env.port || 8081),
        'webpack/hot/only-dev-server',
        './app/index.js'
    ],
    output: {
        path: path.join(__dirname, 'site'),
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ 'react-hot-loader', 'babel-loader?presets[]=es2015&presets[]=react' ],
                exclude: /node_modules/
                // query: {
                //     presets: ['es2015', 'react']
                // }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
