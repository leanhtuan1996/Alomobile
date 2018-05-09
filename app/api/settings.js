'use strict';

var event = require('events');
var _ = require('lodash');
var fs = require('fs');
var exec = require('child_process').exec;
var helper = require('../helpers/index').helper;
var path = require('path');

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

var getListBackupDatabases = () => {

}

module.exports = {
    backupDatabase: backupDatabase,
    restoreDatabase: restoreDatabase,
    downloadBackup: downloadBackup
}