 module.exports = {
     entry: './js/Game.js',
     output: {
         path: './',
         filename: 'bundle.js'
     },
     module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
 };
