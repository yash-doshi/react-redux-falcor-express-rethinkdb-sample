var FalcorServer = require('falcor-express'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    NamesRouter = require('./router'),
    path = require('path');

var PORT = parseInt(process.env.PORT) || 8080;
var serverMode = process.env.server || 'both';
if(serverMode === "both" || serverMode === "express" ) {

    app.use(bodyParser.urlencoded({extended: false}));
    app.use('/model.json', FalcorServer.dataSourceRoute(() => new NamesRouter()));
    app.use(express.static('site'));

    app.listen(PORT, err => {
        if (err) {
            console.error(err)
            return
        }
        console.log('Express Server starting at http://localhost:'+PORT)
    });
}

if(serverMode === "both" || serverMode === "webpack" ) {

    // we start a webpack-dev-server with our config
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('../config/webpack.config.js');
    new WebpackDevServer(webpack(config), {
        hot: true,
        // historyApiFallback: true,
        proxy: {
            "*": "http://localhost:" + PORT
        }
    }).listen((PORT + 1), 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log("Webpack Server starting at at http://localhost:" + (PORT + 1));
    });
}

