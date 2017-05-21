const fs = require("fs");
const path = require("path");

const _ = require("lodash");
const gutil = require("gulp-util");
const through = require("through2");
const CSON = require("cson");

/**
 * @param {object} [options={}] - Options to pass to the CSON parser.
 * @param {string} [options.indent=null] - Which indention level to use for the resulting file.
 */
module.exports = (options) => {
	options = options || {};
	const indent = _.get(options, "indent", null);

	return through.obj((file, encoding, callback) => {
		const inputFilePath = file.path;
		const parsedPath = path.parse(inputFilePath);

		if (file.isNull()) {
			return callback(null, file);
		}

		if (file.isStream()) {
			return callback(new gutil.PluginError("gulp-jcson-merge", "Streaming is not supported"));
		}
	
		if (parsedPath.ext !== ".cson" && parsedPath.ext !== ".json") {
			return callback(new gutil.PluginError("gulp-jcson-merge", "Only .cson or .json file extensions are allowed"));
		}

		const isJSON = parsedPath.ext === ".json";
		const isCSON = !isJSON;
		
		const outputFilePath = isCSON ? gutil.replaceExtension(inputFilePath, isJSON ? ".cson" : ".json") : inputFilePath;

		try {
			fs.accessSync(outputFilePath, fs.constants.R_OK);
		} catch(error) {
			if (isCSON) {
				const inputObject = CSON.parseCSONString(file.contents.toString(), options);
				file.contents = new Buffer(JSON.stringify(inputObject, null, indent));
				file.path = outputFilePath;
			}

			return callback(null, file);
		}

		const parsedInputObject = isCSON ? CSON.parseCSONString(file.contents.toString(), options) : CSON.parseJSONString(file.contents.toString(), options);
		const parsedMergeObject = isCSON ? CSON.parseJSONFile(outputFilePath, options) : CSON.parseCSONFile(outputFilePath, options);

		if (parsedInputObject instanceof Error) {
			return callback(new gutil.PluginError("gulp-jcson-merge", `Could not parse the input file: ${inputFilePath}`));
		}

		if (parsedMergeObject instanceof Error) {
			return callback(new gutil.PluginError("gulp-jcson-merge", `Could not parse the input file: ${outputFilePath}`));
		}

		file.contents = new Buffer(JSON.stringify(_.merge(parsedInputObject, parsedMergeObject), null, indent));
		file.path = outputFilePath;

		return callback(null, file);
	});
};
