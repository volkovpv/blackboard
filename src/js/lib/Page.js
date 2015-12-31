/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

/**
 @param {object} link
 @param {string} pageClass
 */
var Page = function(link, pageClass){
    if(arguments.length){
        this.pageHref = link;
        this.pageClass = pageClass
    }

    this.page = document.querySelector(this.pageHref).import;
    this.pageHtml = this.page.querySelector(this.pageClass).cloneNode(true);

};

Page.prototype.pageHref = 'link[href="html/login.html"]';

Page.prototype.pageClass = '.login';

/**
 @param {string} role
 @param {object} [oldLogin]
 @param {function} [func]
 */
Page.prototype.pageOpen = function(role, oldLogin, func){
    var page,
        functionToPerform = function(){},
        typeOldLogin = typeof oldLogin;

    if(typeof role !== "string"){
        throw {
            message: "role in Page.pageOpen() on string"
        };
    }

    if(typeOldLogin === "function"){
        functionToPerform = oldLogin;
    }

    if(typeOldLogin === "object" && typeof func === "function"){
        functionToPerform = func;
    }


    switch (role) {
        case "PUPIL":
            page = new Page('link[href="html/pupil/page-pupil.html"]', '.page-pupil');
            if(typeOldLogin === "object" && oldLogin !== null){
                document.querySelector('.wrapper').replaceChild(page.pageHtml, oldLogin);
            } else {
                document.querySelector('.wrapper').appendChild(page.pageHtml);
            }
            functionToPerform();
            break;
        case "TEACHER":
            page = new Page('link[href="html/teacher/page-teacher.html"]', '.page-teacher');
            if(typeOldLogin === "object" && oldLogin !== null){
                document.querySelector('.wrapper').replaceChild(page.pageHtml, oldLogin);
            } else {
                document.querySelector('.wrapper').appendChild(page.pageHtml);
            }
            functionToPerform();
            break;
        case "HT":
            page = new Page('link[href="html/headteacher/page-headteacher.html"]', '.page-headteacher');
            if(typeOldLogin === "object" && oldLogin !== null){
                document.querySelector('.wrapper').replaceChild(page.pageHtml, oldLogin);
            } else {
                document.querySelector('.wrapper').appendChild(page.pageHtml);
            }
            functionToPerform();
            break;
    }
};

/**
 @param {object} link
 @param {string} pageClass
 @param {string} [oldClass]
 */
Page.prototype.tabOpen = function(link, pageClass, oldClass){
    var page = new Page(link, pageClass),
        oldLink = document.querySelector(oldClass);
    if(oldLink) {
        document.getElementById('main').replaceChild(page.pageHtml, oldLink);
    } else {
        document.getElementById('main').appendChild(page.pageHtml);
    }
};

/**
 @param {string} currentClass
 @param {string} futureClass
 @param {string} idActionMenu
 @param {object} link
 @param {object} currentId
 @return {object}
 */
Page.prototype.tab = function(currentClass, futureClass, idActionMenu, link, currentId){
    return {
        actionMenu: document.getElementById(idActionMenu),
        currentClass: futureClass,
        tab: function(){
            var actionMenu,
                page = new Page();

            if(currentClass === futureClass) return;
            page.tabOpen(link, futureClass, currentClass);
            this.actionMenu.className = "active";
            currentId.className = "";
        }
    };
};

/**
 @param {string} classNamePage
 @return {function}
 */
Page.prototype.submitLogout = function(classNamePage){
    return function(){
        var old = document.querySelector(classNamePage),
            page = new Page();

        localStorage.removeItem('role');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('success');
        document.querySelector('.wrapper').replaceChild(page.pageHtml, old);
    }
};

module.exports = Page;