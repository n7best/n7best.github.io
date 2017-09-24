'use strict';

const gulp        = require('gulp');
const handlebars  = require('handlebars');
const fs          = require('fs');
const srcmaps     = require('gulp-sourcemaps');
const buffer      = require('vinyl-buffer');
const source      = require('vinyl-source-stream');
const htmlmin   = require('gulp-htmlmin');

function getJS() {
  return readFile('./public/app.min.js');
}

function getCSS() {
  return readFile('./public/app.css');
}

function writeFile( fname, data ) {
  return new Promise(( resolve, reject ) => {
    fs.writeFile( fname, data, err => {
      if ( err ) {
        return reject( err );
      }
      resolve();
    });
  });
}

function readFile( fname ) {
  return new Promise(( resolve, reject ) => {
    fs.readFile( fname, ( err, data ) => {
      if ( err ) {
        return reject( err );
      }
      resolve( data.toString('utf8') );
    });
  });
}

module.exports = () => {
  gulp.task( 'complie', [ 'build', 'css' ], done => {
    let ctx = {};

    getJS()
    .then( js => ctx.js = js )
    .then( () => getCSS() )
    .then( css => ctx.css = css )
    .then( () => readFile( './src/index.hbs') )
    .then( str => {
      // Inline/minified index file
      let inlineResult = handlebars.compile( str )
        ({ js: ctx.js, css: ctx.css });

      writeFile( './public/index.min.html', inlineResult )
      .then( () => {
        // development index file
        let result = handlebars.compile( str )();
        return writeFile( './public/index.html', result )
      })
      .then( done );

    });

  });

  gulp.task('template', ['complie'], ()=> {
    return gulp.src('./public/index.min.html')
      .pipe( htmlmin({ collapseWhitespace: true }) )
      .pipe( gulp.dest('public') );
  })
};
