module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-filerev-match-replace');

    //load this plugin
    grunt.loadTasks('tasks');

    var analyzers = [
        'css-background-analyzer',
        'html-image-analyzer',
        'html-link-analyzer',
        'html-script-analyzer',
        'pug-link-analyzer',
        'pug-script-analyzer',
        'pug-image-analyzer'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            build: {
                files: [
                    { expand: true, cwd: 'test/project', src: ['**'], dest: 'dest/' }
                ]
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            asserts: {
                src: 'dest/**/*.{js,css,png,jpg,svg,gif,jpeg}'
            }
        },
        filerev_match_replace: {
            dist: {
                src: 'dest/**/*.{css,js,html,pug}',
                options: {
                    analyzers: analyzers,
                    webroot: "dest/" //which dir is considers as root '/'
                }
            }
        },
        asserts_processor: {
            src: 'dest/**/*.asserts',
            options: {
                webroot: 'dest/',
                header: '(function(am){\n',
                footer: '\n})(AM.am);',
                asserts_wraper: function(asserts) {
                    return 'am(' + JSON.stringify(asserts) + ');\n';
                }
            }
        }
    });

    // clean task
    grunt.registerTask('clean', 'clean current build.', function () {
        grunt.file.delete('dest/', {
            force: true
        });
    });

    //default
    grunt.registerTask('default', ['clean', 'copy', 'filerev:asserts', 'filerev_match_replace:dist', 'asserts_processor']);
};
