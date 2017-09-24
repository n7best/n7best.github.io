'use strict';

const gulp        = require('gulp');
const rollup      = require('rollup-stream');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const srcmaps     = require('gulp-sourcemaps');
const  uglify = require('rollup-plugin-uglify');
const {minify} = require('uglify-es');
const buffer      = require('vinyl-buffer');
const source      = require('vinyl-source-stream');
const rename      = require('gulp-rename');
const livereload  = require('gulp-livereload');
const util        = require('gulp-util');
const sass        = require('rollup-plugin-sass');

function onError( err, pipeline ) {
  util.log( util.colors.red( `Error: ${ err.message }` ) );
  util.beep();
  pipeline.emit('end');
}

module.exports = () => {
  gulp.task( 'build', [ 'build-min' ] );


  gulp.task( 'build-client', () => {
    let pipeline;
    return pipeline = rollup({
      entry: 'src/app.js', format: 'iife', sourceMap: true, plugins: [
        sass({
          output: 'public/app.css',
        })
      ]
    })
    .on( 'error', err => onError( err, pipeline ) )
    .pipe( source( 'app.js', './src' ) )
    .pipe( buffer() )
    .pipe( srcmaps.init({ loadMaps: true }) )
    .pipe( srcmaps.write( './' ) )
    .pipe( gulp.dest('./public') )
    .pipe( livereload({}) );
  });

  gulp.task( 'build-min', [ 'build-client' ], () => {
    let pipeline;
    return pipeline = rollup({
      entry: 'src/app.js', format: 'iife', sourceMap: false, plugins: [
          sass({
            output: 'public/app.css',
          }),uglify({}, minify)
      ]
    })
    .on( 'error', err => onError( err, pipeline ) )
    .pipe( source( 'app.js', './src' ) )
    .pipe( buffer() )
      .pipe( rename('app.min.js') )
      .pipe( gulp.dest('./public') );
  });
};
