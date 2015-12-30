/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var dataPage = {
    pageHref: 'link[href="html/login.html"]',
    pageClass: '.login',
    pageOpen: function(role, oldLogin){
        var page;
        switch (role) {
            case "PUPIL":
                break;
            case "TEACHER":
                break;
            case "HT":
                page = new Page('link[href="html/page-headteacher.html"]', '.page-headteacher');
                if(oldLogin){
                    document.getElementsByClassName('wrapper')[0].replaceChild(page.pageHtml, oldLogin);
                } else {
                    document.getElementsByClassName('wrapper')[0].appendChild(page.pageHtml);
                }
                break;
        }
    }
};

var Page = function(link, pageClass){
    if(arguments.length){
        this.pageHref = link;
        this.pageClass = pageClass
    }

    this.page = document.querySelector(this.pageHref).import;
    this.pageHtml = this.page.querySelector(this.pageClass).cloneNode(true);

};

Page.prototype = dataPage;

module.exports = Page;