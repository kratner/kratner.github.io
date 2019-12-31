# https://kratner.github.io

## ES6 and Cloud Firestore

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

Links are now stored in Firebase. Here is the previous HTML for the informational links:

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

Here is the previous HTML for the social links:

```
<p>
  <a
    href="https://www.linkedin.com/in/keithratner"
    target="_blank"
    title="Visit my LinkedIn profile"
    class="gtag"
  >
    <span class="icon-linkedin"></span>
  </a>
  <a
    href="https://github.com/kratner"
    target="_blank"
    title="Visit me on GitHub"
    class="gtag"
  >
    <span class="icon-github"></span>
  </a>
  <a
    href="https://www.behance.net/keithratner"
    target="_blank"
    title="Check out some of my portfolio items on Behance.net"
    class="gtag"
  >
    <span class="icon-behance"></span>
  </a>
  <a
    href="https://www.facebook.com/keith.ratner"
    target="_blank"
    title="Visit me on Facebook"
    class="gtag"
  >
    <span class="icon-facebook"></span>
  </a>
  <a
    href="https://www.instagram.com/keithratner"
    target="_blank"
    title="Visit me on Instagram"
    class="gtag"
  >
    <span class="icon-instagram"></span>
  </a>
  <a
    href="https://twitter.com/keithratner"
    target="_blank"
    title="Visit me on Twitter"
    class="gtag"
  >
    <span class="icon-twitter"></span>
  </a>
</p>
```

Links are now being rendered via ES6 template strings:

```
let icon =
        typeof element.icon === 'undefined'
            ? ''
            : `<span class="icon-${element.icon}"></span>`,
    text = typeof element.text === 'undefined' ? '' : element.text,
    aLinkElement = `<a href="${element.href}" class="${
        element.class
    }" title="${element.title}" target="${
        element.target
    }">${text} ${icon}</a>`,
    linkElement = inline
        ? aLinkElement
        : '<p>' + aLinkElement + '</p>';
$container.append(linkElement);
```
