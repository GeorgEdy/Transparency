var modRewrite = require('connect-modrewrite');

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
                src: ['js/Scripts/main.js', 'js/Scripts/**/*.js'],
                // the location of the resulting JS file
                dest: 'js/build.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            mangle:false
            },
            js: {
                src: 'js/build.js',
                dest: 'js/build.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    open: true,
                    base: ['./'],
                    livereload: true,
                    middleware: function (connect, options, middlewares) {
                        var rules = [
                            '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                        ];
                        middlewares.unshift(modRewrite(rules));
                        return middlewares;
                    }

                }
            }
        },
        watch: {
            js: {
                files: ['js/Scripts/main.js', 'js/Scripts/**/*.js'],
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
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('js-dist', ['watch:js']);
    grunt.registerTask('html-dist', ['watch:html']);
    grunt.registerTask('watch:js', ['concat']);
    grunt.registerTask('uglify'['uglify']);
    grunt.registerTask('serve', ['concat', 'uglify', 'connect:server', 'watch']);
    grunt.registerTask('default', ['concat', 'uglify', 'js-dist', 'html-dist']);
};