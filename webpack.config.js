const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

/**
 *
 * @param {string}  globPath  文件的路径
 * @returns entries
 */
function getView(globPath, flag) {
    let files = glob.sync(globPath);

    let entries = {},
        entry, dirname, basename, pathname, extname;

    files.forEach(item => {
        entry = item;
        dirname = path.dirname(entry);//当前目录
        extname = path.extname(entry);//后缀
        basename = path.basename(entry, extname);//文件名
        pathname = path.join(dirname, basename);//文件路径
        if (extname === '.html') {
            entries[pathname] = './' + entry;
        } else if (extname === '.js') {
            entries[basename] = entry;
        }
    });

    return entries;
}

let entriesObj = getView('./src/js/*.js');
console.log(entriesObj);
// webpack 配置
let config = {
    // entry: {
    //     angular: ['angular', 'angular-ui-router'],
    //     app: "./src/js/app.js"
    // },
    entry: entriesObj,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].[chunkhash].js',
        publicPath: ''
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'angular',
            minChunks: Infinity,
            filename: 'static/js/[name].bundle.js'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'static/js/[name].bundle.js'
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            filename: 'static/js/[name].bundle.js'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/fonts/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
};

let pages = Object.keys(getView('./src/*html'));

pages.forEach(pathname => {
    let htmlname = pathname.split('src\\')[1];
    console.log(pathname);
    console.log(htmlname);
    let conf = {
        filename: `${htmlname}.html`,
        template: `${pathname}.html`,
        hash: true,
        chunks: ['manifest', htmlname],
        chunksSortMode: 'manual',
        minify: {
            removeAttributeQuotes: true,
            removeComments: true,
            collapseWhitespace: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }
    };
    if (htmlname === 'index') {
        conf.chunks = ['manifest', 'angular', 'app'];
        // conf.chunksSortMode = function (chunk1, chunk2) {
        //     var order = ['angular', 'app'];
        //     var order1 = order.indexOf(chunk1.names[0]);
        //     var order2 = order.indexOf(chunk2.names[0]);
        //     return order1 - order2;
        // }
    }

    config.plugins.push(new HtmlWebpackPlugin(conf));
});

config.entry.angular = ['angular', 'angular-ui-router'];

module.exports = config;