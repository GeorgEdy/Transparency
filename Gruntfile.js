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
                src: ['js/Scripts/main.js','js/Scripts/**/*.js'],
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
                files: ['js/Scripts/main.js','js/Scripts/**/*.js'],
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

    grunt.registerTask('js-dist', ['watch:js']);
    grunt.registerTask('html-dist', ['watch:html']);
    grunt.registerTask('watch:js', ['concat']);
    grunt.registerTask('serve', ['concat', 'connect:server', 'watch']);
    grunt.registerTask('default', ['concat', 'js-dist','html-dist']);
};