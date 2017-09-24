const gulp        = require('gulp');
const concat      = require('gulp-concat-css');
const clean       = require('gulp-clean-css');
const livereload  = require('gulp-livereload');

module.exports = () => {
  gulp.task( 'css', function () {
    return gulp.src( [ 'src/utils/normalize.css', 'src/css/**/*.css' ] )
      .pipe( concat('main.css') )
      .pipe( clean({ compatibility: 'ie8' }) )
      .pipe( gulp.dest('./public') )
      .pipe( livereload() );
  });
};
