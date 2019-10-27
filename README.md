# gulp-jcson-merge

## This project is no longer maintained and has been archived.

> Merge JSON and CSON to a singular JSON file.

_All options are passed to [CSON](https://github.com/bevry/cson) any output issues should be reported on the CSON [issue tracker](https://github.com/bevry/cson/issues)._

## Install

#### Using npm:

```bash
$ npm install @findq/gulp-jcson-merge
```

#### Using yarn:

```bash
$ yarn add @findq/gulp-jcson-merge
```

## Usage

#### Indentation: none (default)
```javascript
var gulp = require("gulp");
var jcsonMerge = require("@findq/gulp-jcson-merge");

gulp.task("jcson-merge", () => {
  gulp.src([ "./input/**.json", "./input/**.cson" ])
      .pipe(jcsonMerge())
      .pipe(gulp.dest("./output/"));
});
```

#### Indentation: 2 spaces
```javascript
var gulp = require("gulp");
var jcsonMerge = require("@findq/gulp-jcson-merge");

gulp.task("jcson-merge", () => {
  gulp.src([ "./input/**.json", "./input/**.cson" ])
      .pipe(jcsonMerge({
        indent: 2,
      }))
      .pipe(gulp.dest("./output/"));
});
```

#### Indentation: tab
```javascript
var gulp = require("gulp");
var jcsonMerge = require("@findq/gulp-jcson-merge");

gulp.task("jcson-merge", () => {
  gulp.src([ "./input/**.json", "./input/**.cson" ])
      .pipe(jcsonMerge({
        indent: "\t"
      }))
      .pipe(gulp.dest("./output/"));
});
```

## LICENSE
MIT &copy; [FindQ](https://findquf.com) and [contributors](https://github.com/FindQ/gulp-jcson-merge/graphs/contributors)
