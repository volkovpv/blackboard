/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var login = require('./login.js');

var main = function (a){
    return login()+a;
};

document.getElementById('textHeader').innerHTML = main(5);

module.exports = main;