/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var Page                        = require('../lib/Page'),
    utilsOperationLocalStorage  = require('../utils/utilsOperationLocalStorage');

var viewPupil = function(){
    var page            = new Page(),
        currentClass    = '.classSchedule',
        currentId       = document.getElementById('table'),
        nameUser        = document.getElementById('nameUser');


    nameUser.innerHTML = utilsOperationLocalStorage.getDataStorage('firstName')+' '+utilsOperationLocalStorage.getDataStorage('lastName');

    page.tabOpen('link[href="html/pupil/table-pupil.html"]', currentClass);

    window.tabTable = function(){
        var tab = page.tab(currentClass, '.classSchedule', 'table', 'link[href="html/pupil/table-pupil.html"]', currentId);
        tab.tab();
        currentClass = tab.currentClass;
        currentId = tab.actionMenu;
    };

    window.tabAssessment = function(){
        var tab = page.tab(currentClass, '.assessmentPupil', 'assessment', 'link[href="html/pupil/assessment-pupil.html"]', currentId);
        tab.tab();
        currentClass = tab.currentClass;
        currentId = tab.actionMenu;
    };

    window.submitLogout = page.submitLogout('.page-pupil');

};

module.exports = viewPupil;