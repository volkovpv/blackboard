/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var login       = require('./login.js'),
    UtilsData   = require('./utils/UtilsData');

//======================================//
var main = function (a){
    return login()+a;
};

var textHeader = window.document.getElementById('textHeader');
if(textHeader){
    textHeader.innerHTML = main(11);
}
//======================================//



var data = new UtilsData();

document.getElementById('writeJson').onclick = function(){
    data.reWriterData();
};

document.getElementById('getJson').onclick = function(){
    data.getData();
};



module.exports = main;