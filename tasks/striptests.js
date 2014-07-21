// this has not been testing on windows.. use with caution!

module.exports = function(grunt) {
    'use strict';

    var path = require('path');
    var fs = require('fs');
    var rmdir = require('rimraf');

    grunt.registerTask('striptests', 'Stripping tests from node_modules path.', function() {
        var done = this.async();

        var calls = 0;
        var callsDone = 0;
        var dive = function (dir, action) {
            fs.readdir(dir, function (err, list) {
                list.forEach(function (file) {
                    var path = dir + "/" + file;
                    fs.stat(path, function (err, stat) {
                        if (stat && stat.isDirectory()) {
                            calls++;
                            if(path.indexOf('/test')>-1) {
                                rmdir(path,{},function() {
                                    grunt.log.write('Removed ' + path.toString().cyan);
                                    grunt.log.writeln();
                                    callsDone++;
                                });
                            } else {
                                dive(path, action);
                                callsDone++;
                            }
                        } else {
                        }
                    });
                });
            });
        };

        dive('./node_modules', function(err, file) {
            if(callsDone == calls) done();
        });

    });
};
