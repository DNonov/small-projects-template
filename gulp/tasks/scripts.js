const gulp = require('gulp'),
webpack = require('webpack');

gulp.task('scripts', function (callback) {
  //We just point the path to webpack.config.js file.
  //Err argument will console log the error if there is any, and stats argument will console log needy statistics about bundling proces.
  webpack(require('../../webpack.config'), function (err, stats) {
    if (err) {
      //We call toString method to be shure thah the error info will be readable.
      console.log(err.toString()); 
    }
    //We call toString method to be shure thah the statistics info will be readable.
    console.log(stats.toString());
    //We call callback function to let gulp know that the proces has been finished.
    callback();
    
  });
});