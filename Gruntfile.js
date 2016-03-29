module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['js/Scripts/**'],
                // the location of the resulting JS file
                dest: 'js/build.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    open: true,
                    base: ['./'],
                    livereload: true
                }
            }
        },
        watch: {
            js: {
                files: 'js/Scripts/**',
                tasks: 'js-dist'
            },
            html: {
                files: ['Views/**', 'index.html'],
                tasks: 'html-dist'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('default', ['concat', 'html-dist', 'js-dist']);
};


