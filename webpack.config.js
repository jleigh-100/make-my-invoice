const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['./client/src/index.jsx'],
    output: {
        path: __dirname,
        filename: './client/public/bundle.js',
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: './client/public',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                resolve: {
                    extensions: ['.js', '.jsx']
                },
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: 'file-loader',
            },
            {
                test: /\.ttf/,
                loader: 'asset/resource'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './client/index.ejs'),
            filename: path.join(__dirname, './client/public/index.html')
        })
    ],
    stats: { children: true }
};