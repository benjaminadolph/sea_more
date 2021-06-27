// Webpack uses this to work with directories
const path = require('path');
// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on the final bundle. For now, we don't need production's JavaScript 
    // minifying and other things, so let's set mode to development
    mode: 'development',
    devtool: 'source-map',
    // Path to your entry point. From this file Webpack will begin its work
    entry: {
        bundle: ['./js/custom-pixi.js','./scss/main.scss', './scss/controller.scss', './js/start.js', './js/wavify.js', './js/infopage.js', './js/data.js'],
        menu: './js/menu.js'
    },

    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '',
        filename: './dist/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'css', name: '[name].css'}
                    },
                    'sass-loader'
                ]
            }
        ]
    },
};