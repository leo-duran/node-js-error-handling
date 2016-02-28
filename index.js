var fs = require('fs')

// process.on('uncaughtException', (err) => {
//   console.error('uncaughtException', err)
//   console.error('stack', err.stack)
//
//   // it is recommended that you crash the process
//   // process.exit(1)
//
//
//   // process.nextTick(() => { process.exit(1) })
//   // setTimeout(() => {
//   //   process.exit(1)
//   // }, 1000)
// })

function readJson(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}



// 01 - good json - the function works, prints out the json object
// var json = readJson('good.json')
// console.log('json result', json)



// 02 - bad json

// var json = readJson('bad.json')
// console.log('json result', json) // not executed



// 03 - bad json
// note: crashes process, the setTimeout never executes

// setTimeout(() => {
//   console.log('did I run?')
// }, 1000)
//
// var json = readJson('bad.json')
// console.log('json result', json)



// 04 - bad json - with unhandledException
// note: listening to the uncaughtException prevents the
//       app from crashing

// process.on('uncaughtException', (err) => {
//   console.error('uncaughtException', err)
//   console.error('stack', err.stack)
// })
//
// setTimeout(() => {
//   console.log('did I run?')
// }, 1000)
//
// var json = readJson('bad.json')
// console.log('json result', json)



// 05 - bad json - crash the app
// note: the node docs recommend that you crash the process
//       if not, you can end up in a bad state
//
//       also, it is most reliable to write errors to the console
//       if you log using bunyan, wrap the process.exit in a setTimeout
//       to ensure the logs get written

// process.on('uncaughtException', (err) => {
//   console.error('uncaughtException', err)
//   console.error('stack', err.stack)
//
//   process.exit(1)
// })
//
// setTimeout(() => {
//   console.log('did I run?')
// }, 1000)
//
// var json = readJson('bad.json')
// console.log('json result', json)



// 06 - bad.json - to catch or not

setTimeout(() => {
  console.log('did I run?')
}, 1000)

try {
  var json = readJson('bad.json')
  console.log('json result', json)
} catch(err) {
  console.log('error ignored')
}



// 07 - bad.json - throw a better error?
// note: grr, it messed up my stack trace and if the
//       try block was more complicated, it wouldn't
//       be clear where the error occured

setTimeout(() => {
  console.log('did I run?')
}, 1000)

try {
  var json = readJson('bad.json')
  console.log('json result', json)
} catch(err) {
  throw new Error('readJson failed')
}



// === async - callbacks
// function readJsonAsync(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     callback(null, JSON.parse(result))
//   })
// }

// readJsonAsync('good.json', (err, result) => {
//   // naive, doesn't handle err in callback
//   console.log('json result', result)
// })

// === async - callbacks
// readJsonAsync('missing.json', (err, result) => {
//   console.log('json result', result)
// })

// return is important
