//node_modules/nodemon/bin/nodemon.js -e js,ts,json,ejs,tsx --exec ./node_modules/.bin/ts-node --type-check -- ./src/index.ts
/*var nodemon = require('nodemon');

nodemon('-e js,ts,json,ejs,tsx --exec ./node_modules/.bin/ts-node --type-check -- ./src/index.ts' );

nodemon.on('start', function () {
  console.log('App has started');
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});
*/

console.log('Launching', process.version)
require('ts-node').register({ typeCheck: true});
require('./src/index.ts')

