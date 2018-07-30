var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@src': path.resolve('src'),
            '@app': path.resolve('src/App'),
            '@assets': path.resolve('src/assets'),
            '@styles': path.resolve('src/assets/stylesheet')
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3']
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            importer: (url, prev, done) => {
                                if (url[0] === '~') {
                                    url = path.resolve('node_modules', url.substr(1));
                                } else if (url.startsWith('@assets/')) {
                                    url = path.resolve('src/assets/', url);
                                }

                                return {file: url}
                            },
                            includePaths: ["src/assets/"]
                        }
                    }

                ]
            },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff" 
            },
            {
                test: /fonts\/.*\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader?name="[name]-[hash].[ext]"',
            },
            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name]-[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
    })],
    devServer: {
        historyApiFallback: true
    }
}