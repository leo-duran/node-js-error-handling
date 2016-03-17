// var fs = require('fs')

// We will now use the async version of `readFile`

// In general, don't throw errors, create a new error and pass
// as the first callback parameter.

// We'll use uncaughtExceptions to warn us that we have a
// problem with our implementation

// process.on('uncaughtException', (err) => {
//   console.error('uncaughtException', err)
//   // console.error('stack', err.stack)
//
//   process.nextTick(() => { process.exit(1) })
// })

// 01 - bad.json
// note: try/catch does not work with node.js style callbacks

// function readJson(filename, callback) {
//   try {
//     fs.readFile(filename, 'utf8', (err, result) => {
//       callback(null, JSON.parse(result))
//     })
//   } catch (err) {
//     console.log('there was an error processing the json file', err)
//   }
// }
//
// readJson('bad.json', (err, result) => {
//   console.log('json result', result)
// })



// 02 - good.json
// note: a simple callback function

// function readJson(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJson('good.json', (err, result) => {
//   console.log('json result', result)
// })



// 03 - missing.json
// note: we are missing the file, so the readFile
// callback is called with an error
//
// we need to call the callback with the error
//
// JSON.parse gets called with undefined and it
// bubbles up to crash the app

// function readJson(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJson('missing.json', (err, result) => {
//   console.log('json result', result)
// })



// 04 - missing.json
// note: make sure to call the callback with the err
// and return to avoid calling the 'success' callback
//
// the calling function should also handle the error

// function readJson(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     if(err) return callback(err)
//
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJson('missing.json', (err, result) => {
//   if(err) return console.log('readJson failed', err)
//
//   console.log('json result', result)
// })



// 05 - bad.json
// note: The file exists, but is invalid

// function readJson(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     if(err) return callback(err)
//
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJson('bad.json', (err, result) => {
//   if(err) return console.log('readJson failed', err)
//
//   console.log('json result', result)
// })


// 06 - bad.json
// note: JSON.parse is synchronous
//
// to handle synchronous errors, we have to use
// try/catch and execute the callback with the error

// function readJson(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//
//     if(err) return callback(err)
//
//     try {
//       callback(null, JSON.parse(result))
//     } catch (err) {
//       callback(err)
//     }
//   })
// }
//
// readJson('bad.json', (err, result) => {
//   if(err) return console.log('readJson failed', err)
//
//   console.log('json result', result)
// })

// 07 - good.json
// note: yay, it works

// function readJson(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//
//     if(err) return callback(err)
//
//     try {
//       callback(null, JSON.parse(result))
//     } catch (err) {
//       callback(err)
//     }
//   })
// }
//
// readJson('good.json', (err, result) => {
//   if(err) return console.log('readJson failed', err)
//
//   console.log('json result', result)
// })

// **************
//
// Callbacks rob us of 'normal' control flow
// * cannot use try/catch as expected (still useful for synchronous code)
// * return values by passing them as callback arguments
//
// **************
