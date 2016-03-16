'use strict'

var fs = require('fs')

// process.on('uncaughtException', (err) => {
//   console.error('uncaughtException', err)
//   console.error('uncaughtException:stack', err.stack)
//
//   // it is recommended that you crash the process
//   process.exit(1)
//
//
//   // process.nextTick(() => { process.exit(1) })
//   // setTimeout(() => {
//   //   process.exit(1)
//   // }, 1000)
// })


// 01 - good json - the function works, prints out the json object

// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// var json = readJson('good.json')
// console.log('json result', json)



// 02 - bad json

// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// var json = readJson('bad.json')
// console.log('json result', json) // not executed



// 03 - bad json
// note: crashes process, the setTimeout never executes

// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// setTimeout(() => {
//   console.log('did I run?')
// }, 1000)
//
// var json = readJson('bad.json')
// console.log('json result', json)



// 04 - bad json - with unhandledException
// note: listening to the uncaughtException prevents the
//       app from crashing

// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
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
// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// setTimeout(() => {
//   console.log('did I run?')
// }, 1000)
//
// var json = readJson('bad.json')
// console.log('json result', json)



// 06 - bad.json - to catch or not

// function readJson(filename) {
//   try {
//     return JSON.parse(fs.readFileSync(filename, 'utf8'))
//   } catch(err) {
//     console.log('error ignored')
//   }
// }
//
// setTimeout(() => {
//   console.log('did I run?')
// }, 1000)
//
// var json = readJson('bad.json')
// console.log('json result', json)



// 07 - bad.json - throw a better error?
// note: grr, it messed up my stack trace and if the
//       try block was more complicated, it wouldn't
//       be clear where the error occured

// function readJson(filename) {
//   return JSON.parse(fs.readFileSync(filename, 'utf8'))
// }
//
// setTimeout(() => {
//   console.log('did I run?')
// }, 1000)
//
// try {
//   var json = readJson('bad.json')
//   console.log('json result', json)
// } catch(err) {
//   throw new Error('readJson failed')
// }

// **************
// Synchronous code uses normal flow control
// with try/catch
// **************

// === async - callbacks


// 01 - bad.json
// note: try/catch does not work with node style callbacks

// function readJsonAsync(filename, callback) {
//   try {
//     fs.readFile(filename, 'utf8', (err, result) => {
//       callback(null, JSON.parse(result))
//     })
//   } catch (err) {
//     console.log('there was an error processing the json file', err)
//   }
// }
//
// readJsonAsync('bad.json', (err, result) => {
//   console.log('json result', result)
// })



// 02 - good.json
// function readJsonAsync(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJsonAsync('good.json', (err, result) => {
//   console.log('json result', result)
// })



// 03 - missing.json
// note: doesn't console.log due to error in implementation
// function readJsonAsync(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJsonAsync('missing.json', (err, result) => {
//   console.log('json result', result)
// })



// 04 - missing.json - if err, send it in the callback
// note: we get the  json result message, but
//       we also get the JSON.parse error and
//       our app crashes
// function readJsonAsync(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     if(err) callback(err)
//
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJsonAsync('missing.json', (err, result) => {
//   console.log('json result', result)
// })



// 05 - missing.json return is important
// note: yay, we didn't crash the process
//       but we still something went wrong, we
//       logged undefined as a result
// function readJsonAsync(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     if(err) return callback(err)
//
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJsonAsync('missing.json', (err, result) => {
//   console.log('json result', result)
// })



// 06 - missing.json return is important
// note: we finally know the reason for the error
// function readJsonAsync(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     if(err) return callback(err)
//
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJsonAsync('missing.json', (err, result) => {
//   if(err) return console.log('err reading json', err)
//
//   console.log('json result', result)
// })



// 07 - bad.json
// note: The file exists, but is invalid

// function readJsonAsync(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     if(err) return callback(err)
//
//     callback(null, JSON.parse(result))
//   })
// }
//
// readJsonAsync('bad.json', (err, result) => {
//   if(err) return console.log('err reading json', err)
//
//   console.log('json result', result)
// })


// 08 - bad.json
// note: to handle synchronous errors, we have to use
//       try/catch and call the callback with the error

// function readJsonAsync(filename, callback) {
//   fs.readFile(filename, 'utf8', (err, result) => {
//     if(err) return callback(err)
//     try {
//       callback(null, JSON.parse(result))
//     } catch (err) {
//       callback(err)
//     }
//   })
// }
//
// readJsonAsync('bad.json', (err, result) => {
//   if(err) return console.log('err reading json', err)
//
//   console.log('json result', result)
// })



// **************
// Promises
// **************



// Convert a node.js callback style function to a promise
function readFilePromise(filename, enc) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, enc, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

function timeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(delay === 2500) return reject(new Error('timeout error'))
      else resolve()
    }, delay)
  })
}

// 01 - Convert readJsonAsync to use Promises

// function readJsonAsync(filename) {
//   return new Promise((resolve, reject) => {
//     readFilePromise(filename, 'utf8').then((result) => {
//       try {
//         resolve(JSON.parse(result))
//       } catch (err) {
//         reject(err)
//       }
//     }).catch((err) => {
//       reject(err)
//     })
//   })
// }
//
// readJsonAsync('good.json').then((result) => {
//   console.log('good', result)
// }).catch((err) => {
//   console.log('good: err', err)
// })
//
// readJsonAsync('missing.json').then((result) => {
//   console.log('missing', result)
// }).catch((err) => {
//   console.log('missing: err', err)
// })
//
// readJsonAsync('bad.json').then((result) => {
//   console.log('json result', result)
// }).catch((err) => {
//   console.log('bad: err', err)
// })

// 02 - make it clean...
// notes: missing.json, there is an error finding the file
//        so the readFilePromise rejects which moves up the chain
//        where it can be logged by the top level catch
//
//        bad.json, the synchronous exception causes by
//        json.parse moves up the promise chain where it
//        can be logged by the top level catch

// function readJsonAsync(filename) {
//   return readFilePromise(filename, 'utf8').then((result) => {
//     return JSON.parse(result)
//   })
// }

// readJsonAsync('good.json').then((result) => {
//   console.log('good', result)
// }).catch((err) => {
//   console.log('good: err', err)
// })
//
// readJsonAsync('missing.json').then((result) => {
//   console.log('missing', result)
// }).catch((err) => {
//   console.log('missing: err', err)
// })
//
// readJsonAsync('bad.json').then((result) => {
//   console.log('json result', result)
// }).catch((err) => {
//   console.log('bad: err', err)
// })

// 03 - always use a catch at the top level
// note: or your errors might not get caught

// function readJsonAsync(filename) {
//   return readFilePromise(filename, 'utf8').then((result) => {
//     return JSON.parse(result)
//   })
// }
//
// readJsonAsync('bad.json').then((result) => {
//   console.log('json result', result)
// })



// 04 - thank you node! unhandledRejection will let you know if you
//    - are missing a catch somewhere in your code...

// process.on('unhandledRejection', (reason, p) => {
//     console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
//     console.log(reason.stack)
//     // application specific logging, throwing an error, or other logic here
// });
//
// function readJsonAsync(filename) {
//   return readFilePromise(filename, 'utf8').then((result) => {
//     return JSON.parse(result)
//   })
// }
//
// readJsonAsync('bad.json').then((result) => {
//   console.log('json result', result)
// })


// 05 - broken promise chain
// note: every promise needs to be returned
// or errors will be propagated
//
// handling unhandledRejection will catch the error
//
//
// process.on('unhandledRejection', (reason, p) => {
//     console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
//     console.log(reason.stack)
//     // application specific logging, throwing an error, or other logic here
// });

// function sendFile(filename) {
//   console.log('sending file', filename)
//   return timeout(1000).then(function() {
//     return filename
//   })
// }
//
// function readJsonAsync(filename) {
//   console.log('reading file', filename)
//   return readFilePromise(filename, 'utf8').then((result) => {
//     let parsed = JSON.parse(result)
//     console.log('parsed', parsed)
//     return parsed
//   })
// }
//
// function publishContent(content) {
//   console.log('publishing content', content)
//
//
//   // **** oops
//   timeout(1000).then(function() {
//     throw new Error('publish failed')
//     return content
//   })
//
//
// }
//
// sendFile('good.json')
//   .then(readJsonAsync)
//   .then(publishContent)
//   .then((file) => console.log('sent and published:', file))
//   .catch((err) => console.log('error: ', err))
