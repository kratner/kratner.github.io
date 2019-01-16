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

#### Production Notes

##### 1/15/2019

Links are now stored in Firebase. Previous HTML here:

```
    <p>
      <a
        href="/files/KeithRatner_CV_20190108.pdf"
        target="_blank"
        title="Download my Resume (.pdf)"
        class="gtag"
      >
        Download PDF Resume
        <span class="icon-download"></span>
      </a>
    </p>
    <p>
      <a
        href="https://github.com/kratner/hpexcel/raw/master/sources/SDS_MANAGEMENT.xlsm"
        target="_blank"
        title="Sample Microsoft Excel Solution (.xlsm)"
        class="gtag"
      >
        Sample Excel VBA Application (.xlsm)
        <span class="icon-download"></span>
      </a>
    </p>
    <p>
      <a
        href="https://github.com/kratner/krh5"
        target="_blank"
        title="HTML5 Project Template with Sass, ES6, JS module IIFE wrapping, concatenation and minification"
        class="gtag"
      >
        HTML5 Project Template
        <span class="icon-github"></span>
      </a>
    </p>
    <p>
      <a
        href="/files/social-media-profile-image-template.ai"
        target="_blank"
        title="Adobe Illustrator Social Media Profile Template"
        class="gtag"
      >
        Social Media Profile Template (.ai)
        <span class="icon-download"></span>
      </a>
    </p>
    <p>
      <a href="/vhyve" target="_blank" title="vHyve Technologies" class="gtag">
        vHyve
      </a>
    </p>
    <div class="overlay-heading"><h3>Illustrator Plugins</h3></div>
    <p>
      <a
        href="/files/ListOpenFiles.jsx"
        target="_blank"
        title="List Open Files Adobe Illustrator Plugin"
        class="gtag"
      >
        List Open Files (.jsx)
      </a>
    </p>
    <p>
      <a
        href="/files/Export-Named-Artboards-as-PNG.jsx"
        target="_blank"
        title="Export Named Artboards as PNG Adobe Illustrator Plugin"
        class="gtag"
      >
        Export Named Artboards as PNG (.jsx)
      </a>
    </p>
    <p>
      <a
        href="/files/OpenMultipagePDF.jsx"
        target="_blank"
        title="Open Multipage PDF Adobe Illustrator Plugin"
        class="gtag"
      >
        Open Multipage PDF (.jsx)
      </a>
    </p>
```

Links are now being rendered via this ES6 template string:

```
`<p><a href="${element.href}" class="${element.class}" title="${
    element.title
}" target="${element.target}">${element.text} ${icon}</a></p>`
```
