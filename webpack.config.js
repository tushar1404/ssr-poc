const path = require('path');
const context = path.resolve(__dirname)
const ManifestPlugin = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = [
    {
        context: context,
        entry: {
            'client': './src/client/index.jsx'
        },
        output: {
            path: context + '/dist/client',
            publicPath: `/client/`,
            filename: `[name][hash].js`
        },
        resolve: {
            extensions: [".jsx", ".js", ".json", ".scss"]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `[name].[hash].css`
              }),
            new ManifestPlugin({
                fileName: __dirname + '/src/app/resources.json',
                prettyPrint: true,
                publicPath: '/client/'
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.jsx|\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        babelrc: false,
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "regenerator": true
                                }
                            ],
                            "@babel/plugin-proposal-object-rest-spread",
                            "transform-class-properties"
                        ]
                    }
                },
                {
                    test: /\.scss/,
                    loaders: [
                        MiniCssExtractPlugin.loader,
                      {
                        loader: 'css-loader'
                      },
                      'sass-loader',
                    ],
                }
            ]
        }
    },
    {
        target: 'node',
        context: context,
        output: {
            path: context + '/dist/server',
            publicPath: `/`,
            filename: `[name].js`
        },
        entry: {
            'server': context + '/src/server/index'
        },
        resolve: {
            extensions: [".jsx", ".js", ".json", ".scss"]
        },
        externals: [nodeExternals()],
        plugins: [
            new MiniCssExtractPlugin({
                filename: `[name].css`
              })
        ],
        module: {
            rules: [
                {
                    test: /\.jsx|\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        babelrc: false,
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"],
                        plugins: [
                            ["./lazy/plugin"],
                            ["@babel/plugin-syntax-dynamic-import"],
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "regenerator": true
                                }
                            ],
                            "@babel/plugin-proposal-object-rest-spread",
                            "transform-class-properties"
                        ]
                    }
                },
                {
                    test: /\.scss/,
                    loaders: [
                      {
                        loader: 'css-loader'
                      },
                      'sass-loader',
                    ],
                }
            ]
        }
    }
]

module.exports = config