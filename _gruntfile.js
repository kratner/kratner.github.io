module.exports = function(grunt) {

    var initialConfig = {
        pkg: grunt.file.readJSON('package.json'),
        autoprefixer: {
            addons: {
                src: ['addons/*/dist/**/*.css', 'addons/*/ui/**/*.css']
            },
            styleguide: {
                src: ['MDP.UI.StyleGuide/dist/main.css', 'assets/**/*.css']
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            MDP_UI_Core: {
                files: [{
                    "expand": true,
                    "cwd": "MDP.UI.Core/source/",
                    "src": ["scripts/**/*.js"],
                    "dest": "MDP.UI.Core/temp/",
                    "ext": ".js"
                }]
            }
        },
        bake: {
            lib: {
                options: {
                    content: 'package.json'
                },
                files: [{
                    'expand': true,
                    'cwd': 'bake/',
                    'src': ['**/*.html'],
                    'dest': './',
                    'ext': '.html'
                }]
            },
            component_library: {
                files: [{
                    'expand': true,
                    'cwd': 'component-library/bake/',
                    'src': ['**/*.html'],
                    'dest': 'component-library/',
                    'ext': '.html'
                }]
            }
            // MDP_AddOns_FlexibleContent: {
            //     options: {
            //         content: 'addons/MDP.AddOns.FlexibleContent/bake/content.json'
            //     },
            //     files: [{
            //         'expand': true,
            //         'cwd': 'addons/MDP.AddOns.FlexibleContent/bake/',
            //         'src': ['**/*.html'],
            //         'dest': 'addons/MDP.AddOns.FlexibleContent/public/pages/',
            //         'ext': '.html'
            //     }]
            // }
        },
        // bake: {
        //     all: {
        //         files: {
        //             src: "/addons/MDP.AddOns.FlexibleContent/templates/video-hero.html",
        //             dest: "/addons/MDP.AddOns.FlexibleContent/public/pages/temp-vid.html"
        //         }
        //     }
        // },
        clean: ["addons/*/temp", "MDP.UI.Core/temp"],
        eslint: {
            target: ['addons/*/source/**/*.js', 'MDP.UI.Core/source/**/*.js']
        },
        concat: {
            options: {
                separator: ';'
            },
            MDP_UI_Core: {
                src: grunt.file.readJSON('MDP.UI.Core/package.json').libraries,
                dest: 'MDP.UI.Core/dist/scripts/core-libraries.js',
            },
            MDP_UI_Core_2: {
                src: grunt.file.readJSON('MDP.UI.Core/package.json').libraries,
                dest: 'assets/scripts/core-libraries.js',
            },
            MDP_UI_Core_3: {
                files: {
                    'MDP.UI.Core/dist/scripts/core.js': 'MDP.UI.Core/temp/**/*.js',
                    'assets/scripts/core.js': 'MDP.UI.Core/temp/**/*.js'
                }
            },
            MDP_UI_Core_4: {
                files: {
                    'MDP.UI.Core/dist/scripts/core.js.map': 'MDP.UI.Core/temp/**/*.map',
                    'assets/scripts/core.js.map': 'MDP.UI.Core/temp/**/*.map'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! MDP <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            MDP_UI_Core: {
                files: {
                    'MDP.UI.Core/dist/scripts/core.min.js': 'MDP.UI.Core/dist/scripts/core.js',
                    'assets/scripts/core.min.js': 'MDP.UI.Core/dist/scripts/core.js'
                }
            },
            MDP_UI_Core_Libraries: {
                files: {
                    'MDP.UI.Core/dist/scripts/core-libraries.min.js': 'MDP.UI.Core/dist/scripts/core-libraries.js',
                    'assets/scripts/core-libraries.min.js': 'MDP.UI.Core/dist/scripts/core-libraries.js'
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            MDP_UI_StyleGuide: {
                files: {
                    'assets/theme/main.css': 'MDP.UI.StyleGuide/source/styles/main.scss',
                    'assets/theme/edit.css': 'MDP.UI.StyleGuide/source/styles/edit.scss',
                    'MDP.UI.StyleGuide/dist/main.css': 'MDP.UI.StyleGuide/source/styles/main.scss',
                    'MDP.UI.StyleGuide/dist/edit.css': 'MDP.UI.StyleGuide/source/styles/edit.scss'
                }
            },
            MDP_UI_Core: {
                files: {
                    'MDP.UI.Core/dist/main.css': 'MDP.UI.Core/source/styles/main.scss',
                    'assets/styles/main.css': 'MDP.UI.Core/source/styles/main.scss'
                }
            }
        },
        exec: {
            NPM: 'npm install && cd MDP.UI.Core && npm install && cd ../MDP.UI.StyleGuide && npm install',
            MDP_UI_StyleGuide: 'rm -rf MDP.UI.StyleGuide/dist && mkdir -p MDP.UI.StyleGuide/dist && ' + // clean all
                'cp -r MDP.UI.StyleGuide/source/assets/fonts MDP.UI.StyleGuide/dist/ && ' + // build fonts
                'cp -r MDP.UI.StyleGuide/source/assets/fonts assets/theme && ' +
                'cp -r MDP.UI.StyleGuide/source/index.html MDP.UI.StyleGuide/dist/ && ' + // copy index.html to dist
                'mkdir -p MDP.UI.StyleGuide/dist/tools && cp -r MDP.UI.StyleGuide/source/tools/ MDP.UI.StyleGuide/dist/tools/ && ' + // copy index.html to dist
                'rm -rf MDP.UI.StyleGuide/source/styles/utils/assets/icons/svg/.DS_Store && node MDP.UI.StyleGuide/source/tools/build-icons.js && ' +
                'grunt sass:MDP_UI_StyleGuide'
        },
        watch: {
            options: {
                livereload: 1337
            },
            MDP_UI_StyleGuide_CSS: {
                files: ['MDP.UI.StyleGuide/source/**/*.scss'],
                tasks: ['sass:MDP_UI_StyleGuide', 'autoprefixer:styleguide']
            },
            MDP_UI_StyleGuide_Icons: {
                files: ['MDP.UI.StyleGuide/source/**/*.svg'],
                tasks: ['exec:MDP_UI_StyleGuide']
            },
            MDP_UI_StyleGuide_Fonts: {
                files: ['MDP.UI.StyleGuide/source/assets/fonts/**/*.*'],
                tasks: ['exec:MDP_UI_StyleGuide']
            },
            MDP_UI_Core: {
                files: ['MDP.UI.Core/source/**/*.js'],
                tasks: ['eslint', 'babel:MDP_UI_Core', 'concat:MDP_UI_Core_3', 'uglify:MDP_UI_Core']
            }
        },
        'http-server': {

            'dev': {

                // the server root directory 
                root: './',

                // the server port 
                // can also be written as a function, e.g. 
                // port: function() { return 8282; } 
                port: 4000,

                // the host ip address 
                // If specified to, for example, "127.0.0.1" the server will 
                // only be available on that ip. 
                // Specify "0.0.0.0" to be available everywhere 
                host: "localhost",
                cache: 0,
                showDir: false,
                autoIndex: false,

                // server default file extension 
                ext: "html",

                // run in parallel with other tasks 
                runInBackground: true,

                // specify a logger function. By default the requests are 
                // sent to stdout. 
                logFn: function(req, res, error) {},

                // Proxies all requests which can't be resolved locally to the given url 
                // Note this this will disable 'showDir' 
                proxy: false,

                /// Use 'https: true' for default module SSL configuration 
                /// (default state is disabled) 
                https: false,

                // Tell grunt task to open the browser 
                openBrowser: false,

                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                }

            }
        }
    };


    var addons = grunt.file.readJSON('package.json').addons;

    addons.forEach(function(addon, index) {
        var pJSON = grunt.file.readJSON('addons/' + addon + '/package.json'), // Pull in package.json for each addon
            _addon = addon.replace(/\./g, '_'); // Just name of addon with underscores instead of spaces

        var addonPath = 'addons/' + addon + '/'; //specified path for prepending to the paths found in the package.json

        initialConfig.concat[_addon] = {};
        initialConfig.babel[_addon] = {};
        initialConfig.uglify[_addon] = {};
        initialConfig.sass[_addon] = {};
        initialConfig.bake[_addon] = {};
        initialConfig.watch[_addon + '_HTML'] = {};
        initialConfig.watch[_addon + '_JS'] = {};
        initialConfig.watch[_addon + '_CSS'] = {};
        initialConfig.babel[_addon]['files'] = [{
            "expand": true,
            "cwd": addonPath + 'source/',
            "src": ["scripts/**/*.js"],
            "dest": addonPath + "temp/",
            "ext": ".js"
        }];
        // initialConfig.bake[_addon].options = {
        //     content: addonPath + 'bake/content.json'
        // };
        initialConfig.bake[_addon].files = [{
            'expand': true,
            'cwd': addonPath + 'bake/',
            'src': ['**/*.html'],
            'dest': addonPath + 'public/pages/',
            'ext': '.html'
        }];
        initialConfig.concat[_addon].files = {};
        initialConfig.concat[_addon].files[addonPath + 'dist/scripts/main.js'] = addonPath + 'temp/**/*.js';
        initialConfig.concat[_addon].files[addonPath + 'ui/scripts/main.js'] = addonPath + 'temp/**/*.js';
        initialConfig.uglify[_addon].files = [{
            "expand": true,
            "cwd": addonPath + 'ui/',
            "src": ["scripts/**/*.js", "!scripts/**/*.min.js"],
            "dest": addonPath + "ui/",
            "ext": ".min.js"
        }, {
            "expand": true,
            "cwd": addonPath + 'dist/',
            "src": ["scripts/**/*.js", "!scripts/**/*.min.js"],
            "dest": addonPath + "dist/",
            "ext": ".min.js"
        }];
        initialConfig.sass[_addon].files = {};
        initialConfig.sass[_addon].files[addonPath + "ui/styles/main.css"] = {};
        initialConfig.sass[_addon].files[addonPath + "dist/styles/main.css"] = {};
        initialConfig.sass[_addon].files[addonPath + "ui/styles/main.css"] = addonPath + "source/styles/main.scss";
        initialConfig.sass[_addon].files[addonPath + "dist/styles/main.css"] = addonPath + "source/styles/main.scss";

        initialConfig.watch[_addon + '_JS'].files = [addonPath + 'source/**/*.js'];
        initialConfig.watch[_addon + '_CSS'].files = [addonPath + 'source/**/*.scss'];
        initialConfig.watch[_addon + '_HTML'].files = [addonPath + 'bake/**/*.html', addonPath + 'components/**/*.html'];
        initialConfig.watch[_addon + '_JS'].tasks = ['eslint', 'babel:' + _addon, 'concat:' + _addon, 'uglify:' + _addon, 'clean'];
        initialConfig.watch[_addon + '_CSS'].tasks = ['sass:' + _addon, 'autoprefixer:addons'];
        initialConfig.watch[_addon + '_HTML'].tasks = ['bake:' + _addon];
    });

    require('load-grunt-tasks')(grunt);
    grunt.initConfig(initialConfig);

    var MDPAddons = grunt.file.readJSON('package.json').addons;

    var isAddon = function(packageName) {
        var fa = false;
        MDPAddons.forEach(function(addon) {
            if (packageName === addon) {
                fa = true;
            }
        });
        return fa;
    };

    // // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    // // Default task(s).
    grunt.registerTask('default', ['eslint', 'exec:NPM', 'babel', 'concat', 'uglify', 'exec:MDP_UI_StyleGuide', 'sass', 'clean', 'autoprefixer', 'bake', 'http-server', 'watch']);

    grunt.registerTask('deploy', function(packageName) {
        if (packageName == "all") { // Deploy All.

            MDPAddons.forEach(function(addon) {
                grunt.task.run('build:' + addon);
                grunt.task.run('_deploy:' + addon);
            });

            grunt.task.run('build:MDP.UI.StyleGuide');
            grunt.task.run('build:MDP.UI.Core');
            grunt.task.run('_deploy:MDP.UI.StyleGuide');
            grunt.task.run('_deploy:MDP.UI.Core');

        } else {
            if (isAddon(packageName)) {
                grunt.task.run('build:' + packageName);
                grunt.task.run('_deploy:' + packageName);
                grunt.task.run('clean');
            } else if (packageName === 'MDP.UI.Core') {
                grunt.task.run('build:' + packageName);
                grunt.task.run('_deploy:' + packageName);
                grunt.task.run('clean');
            } else if (packageName === 'MDP.UI.StyleGuide') {
                grunt.task.run('build:' + packageName);
                grunt.task.run('_deploy:' + packageName);
                grunt.task.run('clean');
            } else {
                grunt.log.writeln('PACKAGE/ADDON NOT FOUND, VERIFY MANIFEST IN PACKAGE.JSON' ['red'].bold);
                return false;
            }
        }
    });

    grunt.registerTask('build', function(packageName) {
        if (packageName.split('.')[1] === 'AddOns') { // Package is an AddOn
            if (isAddon(packageName)) {
                console.log('Its an addon');
                var _addon = packageName.replace(/\./g, '_');
                grunt.task.run('babel:' + _addon);
                grunt.task.run('uglify:' + _addon);
                grunt.task.run('sass:' + _addon);
                grunt.task.run('autoprefixer');
            } else {
                grunt.log.writeln('PACKAGE/ADDON NOT FOUND, VERIFY MANIFEST IN PACKAGE.JSON' ['red'].bold);
                return false;
            }

        } else if (packageName === 'MDP.UI.StyleGuide') {

            var sGuide = packageName.replace(/\./g, '_');
            grunt.task.run('exec:' + sGuide);
            grunt.task.run('autoprefixer');

        } else if (packageName === 'MDP.UI.Core') {
            grunt.log.writeln('Building Core' ['green'].bold);
            grunt.task.run('concat:MDP_UI_Core');
            grunt.task.run('babel:MDP_UI_Core');
            grunt.task.run('uglify:MDP_UI_Core');
            grunt.task.run('sass:MDP_UI_Core');
            grunt.task.run('autoprefixer');
        } else {

            grunt.log.writeln('PACKAGE NOT RECOGNIZED' ['red'].bold);
            return false;

        }
    });

    grunt.registerTask('_deploy', function(packageName) {
        grunt.option("force", true);
        if (packageName.split('.')[1] === 'AddOns') { // Package is an AddOn

            var addon = packageName,
                _addon = addon.replace(/\./g, '_'),
                aJSON = grunt.file.readJSON('addons/' + addon + '/package.json'),
                addonScripts = grunt.option("prod") ? aJSON.config.prod.scripts : aJSON.config.dev.scripts,
                addonStyles = grunt.option("prod") ? aJSON.config.prod.styles : aJSON.config.dev.styles,
                cdnScripts = grunt.option("prod") ? aJSON.config.prod.cdn_scripts : aJSON.config.dev.cdn_scripts,
                cdnStyles = grunt.option("prod") ? aJSON.config.prod.cdn_styles : aJSON.config.dev.cdn_styles;


            if (grunt.file.exists('../Backend/MDP.Sites.Mna/addons/' + addon + '/ui')) {
                grunt.file.delete('../Backend/MDP.Sites.Mna/addons/' + addon + '/ui');
                grunt.log.writeln('deleted old files...' ['magenta'].bold);
            }

            grunt.file.mkdir('../Backend/MDP.Sites.Mna/addons/' + addon + '/ui');
            grunt.log.writeln('created new directory...' ['magenta'].bold);
            grunt.file.write('../Backend/MDP.Sites.Mna/addons/' + addon + '/ui/config.json', '{"cdns":{"scripts":' + JSON.stringify(cdnScripts) + ',"styles":' + JSON.stringify(cdnStyles) + '},"sources":{"scripts":' + JSON.stringify(addonScripts) + ',"styles":' + JSON.stringify(addonStyles) + '}}');
            grunt.log.writeln('created new config file...' ['magenta'].bold);
            grunt.file.recurse('addons/' + addon + '/ui/', function(path, root, subdir, filename) {
                if (typeof(subdir) !== 'undefined') {
                    grunt.file.copy(path, '../Backend/MDP.Sites.Mna/addons/' + addon + '/ui/' + subdir + '/' + filename);
                } else {
                    grunt.file.copy(path, '../Backend/MDP.Sites.Mna/addons/' + addon + '/ui/' + filename);
                }
            });
            grunt.log.writeln('copied /ui contents to backend...' ['magenta'].bold);
            grunt.log.writeln('DONE!' ['green'].bold);

        } else if (packageName === 'MDP.UI.StyleGuide') { // Is the StyleGuide

            grunt.log.writeln('Deploying ...' ['magenta'].bold);

            if (grunt.file.exists('../Backend/MDP.Sites.Mna/assets/theme')) {
                grunt.file.delete('../Backend/MDP.Sites.Mna/assets/theme');
                grunt.log.writeln('deleted old files...' ['magenta'].bold);

                grunt.file.mkdir('../Backend/MDP.Sites.Mna/assets/theme');
                grunt.log.writeln('created new directory...' ['magenta'].bold);

                grunt.file.recurse('assets/theme/', function(path, root, subdir, filename) {
                    if (typeof(subdir) !== 'undefined') {
                        grunt.file.copy(path, '../Backend/MDP.Sites.Mna/assets/theme/' + subdir + '/' + filename);
                    } else {
                        grunt.file.copy(path, '../Backend/MDP.Sites.Mna/assets/theme/' + filename);
                    }
                });

                grunt.log.writeln('copied /theme contents to backend...' ['magenta'].bold);
                grunt.log.writeln('DONE!' ['green'].bold);
            }

        } else if (packageName === 'MDP.UI.Core') {
            if (grunt.file.exists('../Backend/MDP.Sites.Mna/assets/scripts')) {
                grunt.file.delete('../Backend/MDP.Sites.Mna/assets/scripts');
                grunt.file.mkdir('../Backend/MDP.Sites.Mna/assets/scripts');
                grunt.log.writeln('deleted old script files...' ['magenta'].bold);
                grunt.log.writeln('created new directory...' ['magenta'].bold);
            }
            if (grunt.file.exists('../Backend/MDP.Sites.Mna/assets/styles')) {
                grunt.file.delete('../Backend/MDP.Sites.Mna/assets/styles');
                grunt.file.mkdir('../Backend/MDP.Sites.Mna/assets/styles');
                grunt.log.writeln('deleted old css files...' ['magenta'].bold);
                grunt.log.writeln('created new directory...' ['magenta'].bold);
            }
            grunt.file.recurse('assets/scripts/', function(path, root, subdir, filename) {
                if (typeof(subdir) !== 'undefined') {
                    grunt.file.copy(path, '../Backend/MDP.Sites.Mna/assets/scripts/' + subdir + '/' + filename);
                } else {
                    grunt.file.copy(path, '../Backend/MDP.Sites.Mna/assets/scripts/' + filename);
                }
            });
            grunt.file.recurse('assets/styles/', function(path, root, subdir, filename) {
                if (typeof(subdir) !== 'undefined') {
                    grunt.file.copy(path, '../Backend/MDP.Sites.Mna/assets/styles/' + subdir + '/' + filename);
                } else {
                    grunt.file.copy(path, '../Backend/MDP.Sites.Mna/assets/styles/' + filename);
                }
            });
        }
    });

};
