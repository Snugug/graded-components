'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    swig = require('swig'),
    through = require('through2'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toSwig = [
  'views/**/*.html'
];

//////////////////////////////
// Compile Swig
//////////////////////////////
var compileSwig = function (options) {
  var compile = through.obj(function (file, encoding, cb) {
    var render = swig.compileFile(file.path)();

    file.contents = new Buffer(render);

    this.push(file);

    cb();
  });

  return compile;
}

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, SwigPaths) {
  // Set value of paths to either the default or user entered
  SwigPaths = SwigPaths || toSwig;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var SwigTask = function (path) {
    return gulp.src(SwigPaths)
      .pipe(compileSwig())
      .pipe(gulp.dest('./'))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('swig', function () {
    return SwigTask(SwigPaths);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('swig:watch', function () {
    return gulp.watch(SwigPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return SwigTask(event.path.absolute);
      });
  });
}
