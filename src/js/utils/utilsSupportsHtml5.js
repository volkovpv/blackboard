/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

var utilsSupportsHtml5 = {
    supportsHtml5Storage: function () {
        if(!('localStorage' in window && window['localStorage'] !== null)){
            throw {
                message: "LocalStorage не поддерживается в браузере"
            }
        }
    },

    supportsHtml5Imports: function(){
        if (!("import" in document.createElement("link"))){
            throw {
                message: "HTML5 Imports не поддерживается в браузере"
            }
        }
    },

    support: function(){
        this.supportsHtml5Imports();
        this.supportsHtml5Storage();
    }
};

module.exports = utilsSupportsHtml5;