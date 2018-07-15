const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        util: "./src/js/util.js",
        validateMethod: "./src/js/validateMethod.js",
        app: "./src/js/app.js",
        service: "./src/js/service.js",
        config: "./src/js/config.js",
        directive: "./src/js/directive.js",
        filter: "./src/js/filter.js",
        indexCtrl: "./src/js/controllers/indexCtrl.js",
        etprInfoCtrl: "./src/js/controllers/etprInfoCtrl.js",
        consDetCtrl: "./src/js/controllers/consDetCtrl.js",
        departMngCtrl: "./src/js/controllers/departMngCtrl.js",
        staffMngCtrl: "./src/js/controllers/staffMngCtrl.js",
        deptStmCtrl: "./src/js/controllers/staffMng/deptStmCtrl.js",
        typeMngCtrl: "./src/js/controllers/typeMngCtrl.js",
        clientMngCtrl: "./src/js/controllers/clientMngCtrl.js",
        starsClmCtrl: "./src/js/controllers/clientMng/starsClmCtrl.js",
        staffWelfCtrl: "./src/js/controllers/staffWelfCtrl.js",
        deptStwCtrl: "./src/js/controllers/staffWelf/deptStwCtrl.js",
        clientWelfCtrl: "./src/js/controllers/clientWelfCtrl.js",
        starsClwCtrl: "./src/js/controllers/clientWelf/starsClwCtrl.js",
        welfMarketCtrl: "./src/js/controllers/welfMarketCtrl.js",
        welfareCtrl: "./src/js/controllers/welfMarket/welfareCtrl.js",
        welfDetail: "./src/js/controllers/welfMarket/welfDetail.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist/static'),
        filename: 'js/[name].[chunkhash].js',
        publicPath: 'static/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/index.html'
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
                            name: 'images/[name].[hash:8].[ext]'
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
                            name: 'fonts/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
};