const gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync');

//Gulp task watch for changes. 
gulp.task('watch', function () {
  
  //Show the base dir to the browser-sync server.
  browserSync.init({
    server:{
      baseDir:"app"
    }
  });

  //Watch for changes at index.html and if there is change reload the webpage.
  watch('./app/index.html', function(){
    browserSync.reload();
  });
  
  //Watch for changes at all subdirs at dir styles and all files ending .css and if there is change run cssInject task.
  watch('./app/assets/styles/**/*.css',function () {
    gulp.start('cssInject');
  });
  
  //Watch for changes at all subdirs at dir scripts and all files ending .js and if there is change run scriptsRefresh.
  watch('./app/assets/scripts/**/*.js',function () {
    gulp.start('scriptsRefresh');
  });
});
  
  //Inject css to stream.
  gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
  });

  //Refresh the browser.Has to wait for scripts to finish bundling.
  gulp.task('scriptsRefresh', ['scripts'], function () {
    browserSync.reload();
  });