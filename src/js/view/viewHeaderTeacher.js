/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var Page                        = require('./../lib/Page'),
    utilsOperationLocalStorage  = require('../utils/utilsOperationLocalStorage');

var viewHeaderTeacher = function(){
    var page            = new Page(),
        currentClass    = '.classSchedule',
        currentId       = document.getElementById('table'),
        nameUser        = document.getElementById('nameUser');

    nameUser.innerHTML = utilsOperationLocalStorage.getDataStorage('firstName')+' '+utilsOperationLocalStorage.getDataStorage('lastName');

    page.tabOpen('link[href="html/headteacher/table-headteacher.html"]', currentClass);

    window.tabPupil = function(){
        var tab = page.tab(currentClass, '.pupilSchool', 'pupil', 'link[href="html/headteacher/pupil-headteacher.html"]', currentId);
        tab.tab();
        currentClass = tab.currentClass;
        currentId = tab.actionMenu;
    };


    window.tabTable = function(){
        var tab = page.tab(currentClass, '.classSchedule', 'table', 'link[href="html/headteacher/table-headteacher.html"]', currentId);
        tab.tab();
        currentClass = tab.currentClass;
        currentId = tab.actionMenu;
    };

    window.tabTeacher = function(){
        var tab = page.tab(currentClass, '.teacherHeaderTeacher', 'teacher', 'link[href="html/headteacher/teacher-headteacher.html"]', currentId);
        tab.tab();
        currentClass = tab.currentClass;
        currentId = tab.actionMenu;
    };


    window.submitLogout = page.submitLogout('.page-headteacher');

};

module.exports = viewHeaderTeacher;