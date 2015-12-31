/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var Page                        = require('../lib/Page'),
    utilsOperationLocalStorage  = require('../utils/utilsOperationLocalStorage');


var viewTeacher = function(){
    var page            = new Page(),
        currentClass    = '.classSchedule',
        currentId       = document.getElementById('table'),
        nameUser        = document.getElementById('nameUser');

    nameUser.innerHTML = utilsOperationLocalStorage.getDataStorage('firstName')+' '+utilsOperationLocalStorage.getDataStorage('lastName');

    page.tabOpen('link[href="html/teacher/table-teacher.html"]', currentClass);

    window.tabPupil = function(){
        var tab = page.tab(currentClass, '.pupilSchool', 'pupil', 'link[href="html/teacher/pupil-teacher.html"]', currentId);
        tab.tab();
        currentClass = tab.currentClass;
        currentId = tab.actionMenu;
    };

    window.tabTable = function(){
        var tab = page.tab(currentClass, '.classSchedule', 'table', 'link[href="html/teacher/table-teacher.html"]', currentId);
        tab.tab();
        currentClass = tab.currentClass;
        currentId = tab.actionMenu;
    };

    window.submitLogout = page.submitLogout('.page-teacher');

};

module.exports = viewTeacher;