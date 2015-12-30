/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

var utilsOperationLocalStorage = {
    setDataStorage: function(data){
        for(var name in data){
            localStorage.setItem(name, data[name]);
        }
    },

    getDataStorage: function(name){
        return localStorage.getItem(name);
    },

    removeDataLocalStorage: function(nameStorage){
        for (var i = nameStorage.length; --i >= 0;){
            localStorage.removeItem(nameStorage[i]);
        }
    }
};

module.exports = utilsOperationLocalStorage;