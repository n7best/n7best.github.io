'use strict';

const gulp        = require('gulp');

// Bootstrap individual task files
[ 'build', 'css', 'template', 'watch' ]
  .forEach( task => require(`./tasks/${ task }`)() );

gulp.task( 'default', [  'build', 'css', 'template' ] );
