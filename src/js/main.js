/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

//что бы "умный" jasmine не искал элементы в результатах теста
//if(/PhantomJS/.test(navigator.userAgent)) return;

var DataFileHTML5               = require('./lib/DataFileHTML5'),
    utilsOperationLocalStorage  = require('./utils/utilsOperationLocalStorage'),
    Page                        = require('./lib/Page'),
    utilsSupportsHtml5          = require('./utils/utilsSupportsHtml5'),
    viewLogin                   = require('./view/viewLogin'),
    viewHeaderTeacher           = require('./view/viewHeaderTeacher'),
    viewTeacher                 = require('./view/viewTeacher'),
    viewPupil                   = require('./view/viewPupil');

try {
    utilsSupportsHtml5.support();
    viewLogin();

    var data = new DataFileHTML5();

    window.userRole = function(){
        return utilsOperationLocalStorage.getDataStorage("role");
    };

    (function(){
        var page = new Page(),
            authorizedSuccess = utilsOperationLocalStorage.getDataStorage('success'),
            authorizedRole = utilsOperationLocalStorage.getDataStorage('role');

        if(authorizedSuccess) {
            switch (authorizedRole){
                case "PUPIL":
                    page.pageOpen(authorizedRole, viewPupil);
                    break;
                case "TEACHER":
                    page.pageOpen(authorizedRole, viewTeacher);
                    break;
                case "HT":
                    page.pageOpen(authorizedRole, viewHeaderTeacher);
                    break;
            }

        } else {
            document.querySelector('.wrapper').appendChild(page.pageHtml);
        }
    })();

} catch (e) {
    console.log(e.message);
    //console.log(e.stack);
    //alert(e.message);
}

