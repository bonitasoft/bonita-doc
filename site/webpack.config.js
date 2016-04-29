var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'ng-annotate?add=true!babel',
                exclude: /node_modules/
            },
            {
                test: /.html$/,
                loader: 'ngtemplate?relativeTo=' + __dirname +'/app!html?root=' + __dirname + '/app'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css?root=' + __dirname + '/app', 'autoprefixer-loader?browsers=last 2 versions', 'sass'],
            },
            {
                test: /\.png($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file-loader'
            },
            { 
                test: /\.css$/, 
                loader: "style-loader!css-loader" 
            },
            {   
                test: /\.md$/,
                loader: "html!markdown"
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true, output: { comments: false }}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    resolve: {
        root: path.resolve('app/'),
        extensions: ['', '.js']
    },
    eslint: {
        failOnError: true
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./app")]
    },
    devtool: '#source-map'
};
