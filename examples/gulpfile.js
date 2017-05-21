const gulp = require("gulp");
const jsonCsonMerge = require("../index.js");

gulp.task("jcson-merge", () => {
	gulp.src([ "input/**.json", "input/**.cson" ])
		.pipe(jsonCsonMerge())
		.pipe(gulp.dest("output/"));
});

gulp.task("default", [ "jcson-merge" ]);
