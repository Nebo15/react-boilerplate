require('dotenv').config({ silent: true });
require('babel-register');
require('ignore-styles');

global.__DEV__ = process.env.NODE_ENV !== 'production';
global.__CLIENT__ = false;

require('./server');
