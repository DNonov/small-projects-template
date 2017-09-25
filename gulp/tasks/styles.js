const gulp = require('gulp'),
postcss = require('gulp-postcss'),
//Allowes .css files to be imported.
cssImport = require('postcss-import'),
//Autoprefix all the css properties for the diferent bowsers.
autoprefixer = require('autoprefixer');


// Add postcss filters.
gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([autoprefixer]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});