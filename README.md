gulp-live-serve
==========

A fork of [gulp-serve](https://github.com/nkt/gulp-serve)

with [serve-index](https://www.npmjs.com/package/serve-index) for serving directory, use `config.root` for url

and [connect-livereload](https://www.npmjs.com/package/connect-livereload) for adding the livereload script to the response

**We can't use gulp-serve with middlewares option to do this, because serve-index must be the last middleware,
and connect-livereload should applied ahead of them **

## Usage

``` js
var serve = require('gulp-live-serve')
serve({
  root: './test/',
  port: 3006,
  livereload: {
    port: 35729 // default port
  }
})()
```

## API

* `config.serveIndex` for options of serve-index
* `config.livereload` for options of connect-livereload

See [gulp-serve#readme](https://github.com/nkt/gulp-serve#readme)
