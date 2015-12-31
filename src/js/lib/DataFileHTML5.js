/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

var config      = require('../../config'),
    configData  = JSON.stringify(config);

window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

var objectData = {
    _files: {
        nameDirectory: 'data',
        nameFile: 'data.json'
    },

    getDataTwo: {},
    
    _errorHandler: function(e){
        var msg = '';
        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                break;
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
            default:
                msg = 'Unknown Error';
                break;
        }
        console.log('Error: ' + msg);
    },
    
    _onInitFs: function (fs) {
        var self = this;
        var entries = [];
        fs.root.getDirectory(objectData._files.nameDirectory, {create: true}, function(directory){
            var directorys = directory.createReader();
            directorys.readEntries(function(results){
                var lengthArrFile = results.length;
                for(var i = 0; i < lengthArrFile; i++){
                    if(results[i].name === objectData._files.nameFile){
                        directory.getFile(objectData._files.nameFile, { }, function(file) {

                            file.file(function(file){
                                var reader = new FileReader();
                                var txtArea;
                                reader.onloadend = function(e) {
                                    txtArea = reader.result;
                                    objectData._thisGetData(txtArea);
                                };
                                reader.readAsText(file);
                            });

                        }, self._errorHandler);
                        return
                    }
                }

                directory.getFile(objectData._files.nameFile, {create: true}, function(file) {
                    file.createWriter(function(writer) {
                        var blob = new Blob([configData], {type: 'application/json'});
                        writer.write(blob);
                    });

                }, self._errorHandler);

            });

        });
    },

    _getInitFs: function (fs) {
        var self = this;
        fs.root.getDirectory(objectData._files.nameDirectory, { }, function(directory){
            directory.getFile(objectData._files.nameFile, { }, function(file) {

                file.file(function(file){
                    var reader = new FileReader();
                    var txtArea;
                    reader.onloadend = function(e) {
                        txtArea = reader.result;
                        objectData._thisGetData(txtArea);
                    };
                    reader.readAsText(file);
                });

            }, self._errorHandler);
        });
    },

    _removeFs: function(fs){
        var self = this;
        fs.root.getDirectory(objectData._files.nameDirectory, { }, function(directory){

            directory.getFile(objectData._files.nameFile, { }, function(fileEntry) {
                fileEntry.remove(function() {
                    //console.log('File removed.');
                    objectData._writerData();
                }, self._errorHandler);
            }, self._errorHandler);

        });
    },
    

    _writerFs: function(fs){
        var self = this;
        fs.root.getDirectory(objectData._files.nameDirectory, { }, function(directory){
            directory.getFile(objectData._files.nameFile, {create: true}, function(fileEntry) {

                fileEntry.createWriter(function(fileWriter) {

                    fileWriter.onwriteend = function(e) {
                        //console.log('Write completed.');
                    };

                    fileWriter.onerror = function(e) {
                        //console.log('Write failed: ' + e.toString());
                    };

                    var zzzzzz = JSON.stringify({
                        ddddd: "data"
                    });

                    // Create a new Blob and write it to log.txt.
                    var blob = new Blob([zzzzzz], {type: 'application/json'});
                    fileWriter.write(blob);

                }, self._errorHandler);

            }, self._errorHandler);
        });
    },

    _thisGetData: function(getData){
        //alert(getData);
        this.getDataTwo = JSON.parse(getData);
        //var kkk = this.getDataTwo;
    },

    _writerData: function(){
        var self = this;
        window.requestFileSystem(PERSISTENT, 5*1024*1024, self._writerFs, self._errorHandler);
    },
    
    instFile: function(){
        var self = this;
        if(navigator.webkitPersistentStorage){
            navigator.webkitPersistentStorage.requestQuota(5*1024*1024, function(grantedBytes) {
                window.requestFileSystem(PERSISTENT, grantedBytes, self._onInitFs, self._errorHandler);
            }, function(e) {
                console.log('Error', e);
            });
        }
    },

    reWriterData: function(){
        var self = this;
        window.requestFileSystem(PERSISTENT, 5*1024*1024, self._removeFs, self._errorHandler);
    },


    getData: function(){
        var self = this;
        window.requestFileSystem(PERSISTENT, 5*1024*1024, self._getInitFs, self._errorHandler);
    }

};

var DataFileHTML5 = function(){
    this.instFile();
};

DataFileHTML5.prototype = objectData;

module.exports = DataFileHTML5;