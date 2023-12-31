const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['./client/src/index.jsx'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: './public',
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
                test: /\.(gif|svg|jpg|png|csv)$/,
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
            filename: path.join(__dirname, './public/index.html')
        })
    ],
    stats: { children: true }
};