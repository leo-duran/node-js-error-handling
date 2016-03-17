// var fs = require('fs')

// the goal is to read a file, parse json, and log content

// this is NOT an example of DRY code ;)

// We'll use the synchronous version of `readFile` called `readFileSync`
// by default node.js functions are async so the convention be explicit
// when the function is synchronous

// 01 - good.json
// note: simpe, naive implementation

// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// var json = readJson('good.json')
// console.log('json result', json)



// 02 - bad.json
// note: causes an exception due to a bad.json file
// the exception prevents the console.log

// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// var json = readJson('bad.json')
// console.log('json result', json)



// 03 - bad.json
// note: listening to the uncaughtException prevents the
// app from crashing
//
// the forever() function will keep running
// until it gets a stack overflow

// process.on('uncaughtException', (err) => {
//   console.error('uncaughtException', err)
//   console.error('stack', err.stack)
// })
//
// function forever() {
//   setTimeout(() => {
//     console.log('Still going...')
//
//     forever();
//   }, 1000)
// }
//
// forever()
//
// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// var json = readJson('bad.json')
// console.log('json result', json)



// 04 - bad.json
// note: the node docs recommend that you crash/restart the process
// if not, you can end up in a bad state
//
// it is most reliable to write errors to the console
//
// if you log using bunyan, use process.nextTick to help ensure
// that the logs flush

// process.on('uncaughtException', (err) => {
//   console.error('uncaughtException', err)
//   console.error('stack', err.stack)
//
//   process.nextTick(() => { process.exit(1) })
// })
//
// function forever() {
//   setTimeout(() => {
//     console.log('Still going...');
//
//     forever();
//   }, 1000);
// }
//
// forever()
//
// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// var json = readJson('bad.json')
// console.log('json result', json)



// 05 - bad.json
// note: decide when to let errors bubble up
//
// in general, we let configuration errors crash the app

// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// setTimeout(() => {
//   console.log('Timeout... executed because the error was ignored')
// }, 1000)
//
// try {
//   var json = readJson('bad.json')
//   console.log('json result', json)
// } catch(err) {
//   console.log('readJson failed')
// }



// 06 - bad.json
// note: you can throw a new error with a better message
// to provide context, perhaps a custom error?
//
// grr, it messed up my stack trace and if the
// try block was more complicated, it would not
// be clear where the error occured

// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// setTimeout(() => {
//   console.log('Timeout... does not execute')
// }, 1000)
//
// try {
//   var json = readJson('bad.json')
//   console.log('json result', json)
// } catch(err) {
//   throw new Error('readJson failed')
// }

// **************
//
// Synchronous code uses 'normal' control flow
// * the `readJson` function returned values
// * we were able to use try/catch to ignore errors
//   or let them bubble up and crash the application
//
// **************
