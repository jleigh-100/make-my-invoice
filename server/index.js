const cors = require('cors');
const loader = require('./config-loader')
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
// comment out below line until we actually need an API
// const apiRouter = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const path = require('path');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
const server = express();

require('dotenv').config({ path: path.join(__dirname, '/secrets/.env') });
const config = loader();

server.use(cors());
server.use(webpackDevMiddleware(compiler, { writeToDisk: true }));
server.use(express.static(path.join(__dirname, '../client/public')));
server.use(bodyParser.json());

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '../client/public'));

// TODO: Uncomment the line below when we actually need an API
// server.use('/api', apiRouter);

server.use('/*', (req, res) => res.render('index'));

server.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));