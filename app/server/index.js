require('babel-register');

global.__DEV__ = true;
global.__CLIENT__ = true;

require('./server');
