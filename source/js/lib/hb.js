/**
 * Created by joaojose on 01/04/17.
 */
module.exports = function (grunt) {

    var hb = require('gulp-hb'),
        path = require('path'),
        rename = require('gulp-rename'),
        vinylFs = require('vinyl-fs');
    grunt.registerMultiTask('hb', 'Renders Handlebars templates to static HTML.', function () {
        var done,
            options = this.options(),
            files = this.files,
            count = files.length;


        // istanbul ignore next
        function fail(err) {
            grunt.log.error(err);
            done(false);
        }

        function success() {
            // Are we done yet?
            if (--count === 0) {
                done(true);
            }
        }

        function process(file) {
            var dest = file.dest,
                dirname = path.dirname(dest),
                basename = path.basename(dest);

            // console.log(hb(options));

            vinylFs                          // Oh yes I did
                .src(file.src)               // Read file
                // .pipe(frontMatter(options))  // Parse frontmatter
                .pipe(hb(options).helpers(require('handlebars-layouts')).data(options.more || {}))// Render handlebars
                .pipe(rename(basename))      // Set new filename
                .pipe(vinylFs.dest(dirname)) // Write file
                .on('error', fail)           // Handle errors
                .on('finish', success);      // Mark completed
        }

        if (count) {
            done = this.async();
            files.forEach(process);
        }
    });
}
