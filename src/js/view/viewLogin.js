/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var controllerLogin             = require('../controller/controllerLogin'),
    utilsOperationLocalStorage  = require('../utils/utilsOperationLocalStorage'),
    Page                        = require('./../lib/Page'),
    viewHeaderTeacher           = require('./viewHeaderTeacher'),
    viewTeacher                 = require('./viewTeacher'),
    viewPupil                   = require('./viewPupil');

var viewLogin = function(){
    window.submitLogin = function(){
        var email = document.forms['login'].email.value,
            password = document.forms['login'].password.value,
            oldLogin = document.querySelector('.login'),
            data = {},
            logins = {},
            page = new Page();

        if(email === '') {
            alert("Введите e-mail");
            return
        }

        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(email)){
            alert("Введите корректный e-mail");
            return;
        }

        if(password === '') {
            alert("Введите пароль");
            return
        }

        data = {
            login: email,
            password: password
        };

        logins = controllerLogin(data);
        if(!logins.success){
            alert("Логин или пароль неправельный");
            return;
        }

        if(logins.success){
            utilsOperationLocalStorage.setDataStorage({
                role: logins.role,
                firstName: logins.firstName,
                lastName: logins.lastName,
                success: logins.success
            });

            switch (logins.role){
                case "PUPIL":
                    page.pageOpen(logins.role, oldLogin, viewPupil);
                    break;
                case "TEACHER":
                    page.pageOpen(logins.role, oldLogin, viewTeacher);
                    break;
                case "HT":
                    page.pageOpen(logins.role, oldLogin, viewHeaderTeacher);
                    break;
            }
        }
    };
};

module.exports = viewLogin;