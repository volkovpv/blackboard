/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

//что бы "умный" jasmine не искал в элементы в результатах теста
if(/PhantomJS/.test(navigator.userAgent)) return;

var login                       = require('./controller/login'),
    UtilsData                   = require('./utils/UtilsData'),
    utilsOperationLocalStorage  = require('./utils/utilsOperationLocalStorage'),
    Page                        = require('./view/Page'),
    utilsSupportsHtml5          = require('./utils/utilsSupportsHtml5');

try {
    utilsSupportsHtml5.support();
} catch (e) {
    console.log(e.message);
    alert(e.message);
}

var data = new UtilsData();

window.submitLogin = function(){
    var email = document.forms['login'].email.value,
        password = document.forms['login'].password.value,
        oldLogin = document.querySelector('.login'),
        data = {},
        logins = {},
        page;

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

    logins = login(data);
    if(!logins.success){
        alert("Логин или пароль неправельный");
        return;
    }

    if(logins.success && logins.role === "HT"){
        utilsOperationLocalStorage.setDataStorage({
            role: logins.role,
            firstName: logins.firstName,
            lastName: logins.lastName,
            success: logins.success
        });
        page = new Page();
        page.pageOpen(logins.role, oldLogin);

    }
};

window.submitLogout = function(){
    var old = document.querySelector('.page-headteacher');
    var page = new Page();
    utilsOperationLocalStorage.removeDataLocalStorage(["role", "firstName", "lastName", "success"]);
    document.getElementsByClassName('wrapper')[0].replaceChild(page.pageHtml, old);
};

window.userRole = function(){
    return utilsOperationLocalStorage.getDataStorage("role");
};

(function(){
    var page,
        authorizedSuccess = utilsOperationLocalStorage.getDataStorage('success'),
        authorizedRole = utilsOperationLocalStorage.getDataStorage('role');

    if(authorizedSuccess) {
        page = new Page();
        page.pageOpen(authorizedRole);
    } else {
        page = new Page();
        document.getElementsByClassName('wrapper')[0].appendChild(page.pageHtml);
    }
})();