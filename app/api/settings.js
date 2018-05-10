'use strict';

var event = require('events');
var _ = require('lodash');
var fs = require('fs');
var exec = require('child_process').exec;
var helper = require('../helpers/index').helper;
var path = require('path');
var config = require('config');

var backupDatabase = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('backup');
    });

    workflow.on('response', (result) => {
        return cb(result)
    });

    workflow.on('backup', () => {
        var execFile = path.join(__dirname, '..', '..', 'bin', 'backup-db.sh');
        exec(execFile, (error, stdout, stderr) => {
            if (stdout) {
                var pathRaw = stdout.match(/(\/.{1,}alomobile.{1,})(\.gz)/gm);   
                if (pathRaw && pathRaw.length > 0) {
                    var path = pathRaw[0];
                    var pathSplited = path.split('/');
                    if (pathSplited && pathSplited.length > 0) {
                        var fileName = pathSplited[pathSplited.length - 1];  
                        workflow.emit('response', {
                            fileName: fileName,
                            path: path
                        });
                    } else {
                        workflow.emit('response', {
                            error: "Backup failed, please try again!"
                        });
                    }
                } else {
                    workflow.emit('response', {
                        error: "Backup failed, please try again!"
                    })
                }  
            } else {
                workflow.emit('response', {
                    error: "Backup failed, please try again!"
                })
            }
        });
    });

    workflow.emit('validate-parameters');
};

var downloadBackup = (path, fileName, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!path) {
            workflow.emit('response', {
                error: "Path of file is required!"
            });
            return
        }

        if (!fileName) {
            workflow.emit('response', {
                error: "File name is required!"
            });
            return
        }

        workflow.emit('download');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('download', () => {
        fs.exists(path, (isExist) => {
            if (isExist) {
                workflow.emit('response', {
                    path: path,
                    fileName: fileName
                })
            } else {
                workflow.emit('response', {
                    error: "Path of file is exit"
                });
            }
        })
    })

    workflow.emit('validate-parameters');
}

var restoreDatabase = () => {

};

var getListBackupDatabases = (cb) => {
    exec(`ls ${config.get('dirBackUpDb')}`, (error, stdout, sdterr) => {
        if (stdout) {
            var fileMatches = stdout.match(/(alomobile.{1,})(.gz)/gm);
            if (fileMatches && fileMatches.length > 0) {
                var files = [];

                fileMatches.forEach(element => {
                    //get fileName
                    //get filePath
                    //convert timestamp to human time
                    var fileName = element;
                    var filePath = config.get('dirBackUpDb');
                    var dateCreated;
                    var temp = element.match(/[\d]{10,}/g);
                    if (temp && temp.length > 0) {
                        dateCreated = temp[0];
                    }
                    var size = sizeOf(`${filePath}/${fileName}`);
                    files.push({
                        fileName: fileName,
                        filePath: `${filePath}/${fileName}`,
                        dateCreated: dateCreated || undefined,
                        size: size || undefined
                    });
                });

                return cb({
                    files: files
                });
            } else {
                return cb({
                    files: []
                });
            }
        } else {
            return cb({
                files: []
            });
        }
    });
}

var removeBackUpFile = (path, fileName, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!path) {
            workflow.emit('response', {
                error: "Path of file is required!"
            });
            return
        }

        if (!fileName) {
            workflow.emit('response', {
                error: "File name is required!"
            });
            return
        }

        workflow.emit('remove');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('remove', () => {
        fs.exists(path, (isExist) => {            
            if (isExist) {
                exec(`rm -f ${path}/${fileName}`, (error, stdout, stderr) => {
                    if (error) {
                        workflow.emit('response', {
                            error: "Can not remove file"
                        });
                    } else {
                        workflow.emit('response', {
                            error: null
                        });
                    }
                });
            } else {
                workflow.emit('response', {
                    error: "Path of file is exit"
                });
            }
        })
    })

    workflow.emit('validate-parameters');
}

function sizeOf(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes / 1000
}

module.exports = {
    backupDatabase: backupDatabase,
    restoreDatabase: restoreDatabase,
    downloadBackup: downloadBackup,
    getListBackupDatabases: getListBackupDatabases,
    removeBackUpFile: removeBackUpFile
}