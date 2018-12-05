import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AutoPrefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import path from 'path';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanCSSPlugin from 'less-plugin-clean-css';

const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV !== 'production';
const CSS_MAPS = ENV !== 'production';

console.log(`Running in: ${ENV}`);

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: './index.js',
    mode: ENV,
    
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: '/',
		filename: DEV ? 'bundle.js' : 'bundle.[chunkhash:8].js'
	},

	resolve: {
		extensions: ['.jsx', '.js', '.json', '.less'],
		modules: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "src/components"),
			style: path.resolve(__dirname, "src/style"),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},

	module: {
        rules: [
            {
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "eslint-loader"
            },
		    {
			    test: /\.jsx?$/,
			    exclude: /node_modules/,
			    loader: 'babel-loader'
		    },
            {
                test: /\.(le|c)ss$/,
                exclude: /node_modules/,
                use: [ { loader: DEV ? 'style-loader' :  MiniCssExtractPlugin.loader },
                       { loader: 'css-loader',
                         options: { modules: true, importLoaders: 1 } },
                       { loader: 'postcss-loader',
                         options: { plugins: () => {
                             AutoPrefixer({ browsers: [ 'last 2 versions' ] });
                         } } },
                       { loader: 'less-loader' }
                     ]
            },
		    {
			    test: /\.json$/,
			    loader: 'json-loader'
		    },
		    {
			    test: /\.(xml|html|txt|md)$/,
			    loader: 'raw-loader'
		    },
		    {
			    test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
			    loader: ENV==='production' ? 'file?name=[path][name]_[hash:base64:5].[ext]' : 'url'
		    }
	    ]
    },

    plugins: ([
        new webpack.NoEmitOnErrorsPlugin(),
        new FlowBabelWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: DEV ? "[name].css" : '[name].[hash].css',
            chunkFilename: DEV ? "[id].css" : '[id].[hash].css'
        }),
	    new webpack.DefinePlugin({
		    'process.env.NODE_ENV': JSON.stringify(ENV)
	    }),
	    new HtmlWebpackPlugin({
		    template: './index.ejs',
		    minify: DEV ? false : { collapseWhitespace: true }
	    }),
	    new CopyWebpackPlugin([
		    { from: './manifest.json', to: './' },
		    { from: './favicon.ico', to: './' }
	    ])
    ]).concat(ENV==='production' ? [
	    // strip out babel-helper invariant checks
	    new ReplacePlugin([{
		    pattern: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
		    replacement: () => 'return;('
	    }]),
	    new OfflinePlugin({
		    relativePaths: false,
		    AppCache: false,
		    excludes: ['_redirects'],
		    ServiceWorker: {
			    events: true
		    },
		    cacheMaps: [
			    {
				    match: /.*/,
				    to: '/',
				    requestTypes: ['navigate']
			    }
		    ],
		    publicPath: '/'
	    })
    ] : []),

    stats: { colors: true },

    node: {
	    global: true,
	    process: false,
	    Buffer: false,
	    __filename: false,
	    __dirname: false,
	    setImmediate: false
    },

    // optimization : {
    //     minimize: true
    // },

    devtool: ENV === 'production' ? 'inline-source-map' : 'cheap-source-map',

    devServer: {
	    port: process.env.PORT || 5000,
	    host: 'localhost',
	    publicPath: '/',
	    contentBase: './src',
        progress: true,
	    historyApiFallback: true,
	    open: false,
        hot: false
    }
};
