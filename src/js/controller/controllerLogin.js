/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var config = require('../../config');

var controllerLogin = function login(data){
    for (var item in config){
        var lengthItem = config[item].length;
        for(var i = 0; i < lengthItem; i++){
            if(data.login === config[item][i].email && data.password === config[item][i].password){
                return{
                    success: true,
                    role: config[item][i].role,
                    firstName: config[item][i].firstName,
                    lastName: config[item][i].lastName
                }
            }
        }
    }

    return{
        success: false
    }
};

module.exports = controllerLogin;