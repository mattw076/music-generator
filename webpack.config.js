const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const dotEnv = require('dotenv-webpack');
const WebpackObfuscator = require('webpack-obfuscator');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
    favicon: "./src/images/music-logo-icon.ico"
});

// Create a single scss file from each component's scss file
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css"
});


const config = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
    plugins: [htmlPlugin, miniCssExtractPlugin, new dotEnv({ systemvars: true })],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                // Generate a unique identifier for CSS classes
                                // e.g. two different elements with .class-1 in separate components will be given different class names to eachother
                                localIdentName: '[local]-[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = (env, argv) => {

    if (argv.mode === "production") {
        config.module.rules.push({
            test: /\.js$/,
            exclude: /node_modules/,
            enforce: 'post',
            use: {
                loader: WebpackObfuscator.loader,
                options: {
                    rotateStringArray: true
                }
            }
        });

        config.devtool = "hidden-source-map";
    } else {
        config.devtool = "eval-source-map";
    }

    return config;
};


