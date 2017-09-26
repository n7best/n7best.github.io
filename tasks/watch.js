'use strict';

const gulp = require('gulp');
const livereload  = require('gulp-livereload');

module.exports = () => {
  gulp.task( 'watch', () => {
    livereload.listen();
    return gulp.watch(
      [ 'src/*.js', 'src/*.sass', 'src/index.hbs', 'src/**/*.js'],
      [ 'build', 'css', 'template']
    );
  });
};
