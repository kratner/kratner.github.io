# https://kratner.github.io

This is my main repository which contains links to further resources and information.

Clone to your local drive and run

```
npm install
```

then

```
npm update
```

to perform intial setup, then

```
grunt
```

to launch the development environment. Note that I'm using `bake` to compose HTML pages.

```
  grunt.registerTask('default', [
    'concat', // concatenate JavaScript files
    'babel', // ES6
    'sass', // CSS preprocessor
    'autoprefixer', // CSS rule prefixes
    'cssmin', // css file minification
    'uglify', // JavaScript file minification
    'bake', // static templating engine
    'http-server', // local webserver
    'watch' // live reload
  ]);
```

Run `grunt` to launch the web server and respective watch tasks.

Live reload will be active here:

### http://0.0.0.0:8080/index_test.html
