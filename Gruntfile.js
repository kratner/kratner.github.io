/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    autoprefixer: {
      compile: {
        files: {
          'css/styles.css': 'css/styles.css',
          'css/wprest_main.css': 'css/wprest_main.css'
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

          'index_test.html': 'source/bake/index_test.html',
          'index.html': 'source/bake/index.html',
          'styles/index_test.html': 'source/bake/styles_test.html',
          'styles/index.html': 'source/bake/styles.html'

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
    'http-server': {
      dev: {
        // the server root directory
        root: '.',

        // the server port
        // can also be written as a function, e.g.
        // port: function() { return 8282; }
        port: 8080,

        // the host ip address
        // If specified to, for example, "127.0.0.1" the server will
        // only be available on that ip.
        // Specify "0.0.0.0" to be available everywhere
        host: '0.0.0.0',

        cache: 0,
        showDir: true,
        autoIndex: true,

        // server default file extension
        ext: 'html',

        // run in parallel with other tasks
        runInBackground: true | false,

        // specify a logger function. By default the requests are
        // sent to stdout.
        logFn: function(req, res, error) {},

        // Proxies all requests which can't be resolved locally to the given url
        // Note this this will disable 'showDir'
        // proxy: "http://someurl.com",

        /// Use 'https: true' for default module SSL configuration
        /// (default state is disabled)
        https: false,

        // Tell grunt task to open the browser
        openBrowser: false

        // customize url to serve specific pages
        /*
            customPages: {
                "/readme": "README.md",
                "/readme.html": "README.html"
            }
            */
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
          'js/main.min.js': ['js/main/main.js'],
          'js/wprest.min.js': ['js/wprest.js']
        },
        options: {
          quoteStyle: 1
        }
      }
    },
    watch: {
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
        tasks: ['sass', 'autoprefixer', 'cssmin', 'bake'],
        options: {
          livereload: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', [
    'concat',
    'babel',
    'sass',
    'autoprefixer',
    'cssmin',
    'uglify',
    'bake',
    'http-server',
    'watch'
  ]);
};
