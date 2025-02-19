const path = require('path');

module.exports = {
  entry: './app.js', // entry file
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'development', // or 'production'
};