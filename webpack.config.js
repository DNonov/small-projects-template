//Path is native node.js so we don't need to install via npm.
const path = require('path');                                    

module.exports = {
  //The file that will be compiled.
  entry: {
    app: './app/assets/scripts/app.js'
  },
  //The file that is compiled.
  output: {
    //Path.resolve creates absolute path to webpack output bundled file. Webpack need absolute path for output.
    path: path.resolve(__dirname, './app/temp/scripts'),
    //The name of the bundled file. The file will be created in the dri ponted at path.
    filename: '[name].js'
  },
  //Babel config
  module: {
    loaders: [
      { 
        //The babel package.
        loader: 'babel-loader',
        query: {
          //The js version we want to compile to ES5.
          presets: ['es2015']
        },
        test: /\.js$/,
        //We set the dirs that will be excluded during the compiling proces.
        exclude:/node_modules/
      }
    ]
  }
};