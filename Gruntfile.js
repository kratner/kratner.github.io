/*global module:false*/
/*eslint quote-props: ["error", "as-needed"]*/
module.exports = grunt => {
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        autoprefixer: {
            compile: {
                files: {
                    'css/styles.css': 'css/styles.css'
                    //'css/wprest_main.css': 'css/wprest_main.css'
                }
            }
        },
        babel: {
            options: {
                //sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    // "js/main/modules/*.js": "source/scripts/main/modules/*.js",
                    // "js/main/main.js": "source/scripts/main/main.js",
                    // "js/main/core.js": "source/scripts/main/core.js",
                    'js/main/main.js': 'scripts/concat.js'
                    // "js/wprest.js": "scripts/wprest.js"
                }
            }
        },
        bake: {
            your_target: {
                options: {
                    // Task-specific options go here.
                },

                files: {
                    // files go here, like so:

                    'index_test.html':
                        'source/bake/index_test.html',
                    'index.html': 'source/bake/index.html',
                    'styles/index_test.html':
                        'source/bake/styles_test.html',
                    'styles/index.html':
                        'source/bake/styles.html'

                    // etc ...
                }
            }
        },
        concat: {
            options: {
                separator: ''
            },
            main: {
                src: ['source/scripts/main/**/*.js'],
                dest: 'scripts/concat.js'
            }
        },

        connect: {
            dev: {
                options: {
                    base: '.',
                    livereload: true,
                    open: true,
                    port: 9001
                }
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'css',
                        ext: '.min.css'
                    }
                ]
            }
        },
        sass: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'source/styles',
                        src: ['*.scss'],
                        dest: 'css',
                        ext: '.css'
                    }
                ]
            }
        },
        uglify: {
            my_target: {
                files: {
                    //'js/main.min.js': ['js/main.js'],
                    'js/main.min.js': ['js/main/main.js']
                    //'js/wprest.min.js': ['js/wprest.js']
                },
                options: {
                    quoteStyle: 1
                }
            }
        },
        watch: {
            bake: {
                files: ['source/bake/*.*'],
                tasks: ['bake'],
                options: {
                    livereload: true
                }
            },
            includes: {
                files: ['source/includes/*.*'],
                tasks: ['bake'],
                options: {
                    livereload: true
                }
            },
            pages: {
                files: ['*.html'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['source/**/*.js'],
                tasks: ['concat', 'babel', 'uglify'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },
            styles: {
                files: ['source/**/*.scss'],
                tasks: [
                    'sass',
                    'autoprefixer',
                    'cssmin',
                    'bake'
                ],
                options: {
                    livereload: true
                }
            }
        }
    });

    // These plugins provide necessary tasks.

    /*
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    */

    // grunt.loadNpmTasks('grunt-contrib-qunit');
    // grunt.loadNpmTasks('grunt-contrib-jshint');

    /*
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-concat');
    */

    // Default task.
    grunt.registerTask('default', [
        'concat',
        'babel',
        'sass',
        'autoprefixer',
        'cssmin',
        'uglify',
        'bake',
        'connect:dev',
        'watch'
    ]);
};
