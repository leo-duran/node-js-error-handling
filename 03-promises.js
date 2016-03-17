var fs = require('fs')

// There are several promise libraries that will convert
// callbacks to promises

// http://bluebirdjs.com/docs/api/promise.promisifyall.html
// i.e.
// Promise.promisifyAll(require("redis"));

// We'll do it manually

// function readFile(filename, enc) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, enc, (err, result) => {
//       if (err) reject(err)
//       else resolve(result)
//     })
//   })
// }
//
// function timeout(delay, passthrough) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if(delay === 1100) return reject(new Error('something went wrong'))
//       else resolve(passthrough)
//     }, delay)
//   })
// }

// Convert readJson to use Promises

// 01 - good.json
// note: it works as expected, using the promise with 'then'

// function readJson(filename) {
//   return new Promise((resolve, reject) => {
//     readFile(filename, 'utf8').then((result) => {
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
// readJson('good.json').then((result) => {
//   console.log('result', result)
// }).catch((err) => {
//   console.log('no error to catch', err)
// })



// 02 - missing.json
// note: again, it works as expected
//
// the file is missing, so it executes the catch

// function readJson(filename) {
//   return new Promise((resolve, reject) => {
//     readFile(filename, 'utf8').then((result) => {
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
// readJson('missing.json').then((result) => {
//   console.log('missing, no result', result)
// }).catch((err) => {
//   console.log('readJson failed', err)
// })



// 03 - bad.json
// note: ditto

// function readJson(filename) {
//   return new Promise((resolve, reject) => {
//     readFile(filename, 'utf8').then((result) => {
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
// readJson('bad.json').then((result) => {
//   console.log('bad, no result', result)
// }).catch((err) => {
//   console.log('readJson failed', err)
// })



// 04 - clean up, missing.json
// note: readFile is a promise, so we can just return it
// instead of wrapping it in a promise.

// function readJson(filename) {
//   return readFile(filename, 'utf8').then((result) => {
//     try {
//       JSON.parse(result)
//     } catch (err) {
//       throw err
//     }
//   })
// }
//
//
// readJson('missing.json').then((result) => {
//   console.log('missing, no result', result)
// }).catch((err) => {
//   console.log('readJson failed', err)
// })



// 05 - clean up, bad.json
// note: we can return the value of the JSON.parse function
// and, because we have a top level catch, the synchronous error
// is caught

// function readJson(filename) {
//   return readFile(filename, 'utf8').then((result) => {
//     return JSON.parse(result)
//   })
// }
//
// readJson('bad.json').then((result) => {
//   console.log('bad, no result', result)
// }).catch((err) => {
//   console.log('readJson failed', err)
// })



// 06 - good.json
// note: we can make it even shorter

// function readJson(filename) {
//   return readFile(filename, 'utf8')
//     .then(JSON.parse)
// }
//
// readJson('good.json').then((result) => {
//   console.log('result', result)
// }).catch((err) => {
//   console.log('no error to catch', err)
// })

// because, inside of a 'then' we can do 3 things...
// 1) return another promise
// 2) return a synchronous value (or undefined)
// 3) throw a synchronous error



// 07 - bad.json
// note: always use a catch at the top level
// or your errors might not get caught

// function readJson(filename) {
//   return readFile(filename, 'utf8')
//     .then(JSON.parse)
// }
//
// readJson('bad.json').then((result) => {
//   console.log('json result', result)
// })



// 08 - bad.json
// note: thank you unhandledRejection! it will let you know if you
// are missing a catch somewhere in your code...

// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at: Promise', p, ' reason: ', reason);
//   // application specific logging, throwing an error, or other logic here
// });
//
// function readJson(filename) {
//   return readFile(filename, 'utf8')
//     .then(JSON.parse)
// }
//
// readJson('bad.json').then((result) => {
//   console.log('json result', result)
// })



// 09 - broken promise chain
// note: every promise needs to be returned
// or errors will not be propagated
//
// handling unhandledRejection will catch the error

// process.on('unhandledRejection', (reason, p) => {
//   console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
//   // application specific logging, throwing an error, or other logic here
// });
//
// function getFile(filename) {
//   console.log('getting file')
//   return timeout(1000, filename)
// }
//
// function readJson(filename) {
//   console.log('parsing file')
//   return readFile(filename, 'utf8')
//     .then(JSON.parse)
// }
//
// function publishContent(content) {
//   console.log('publishing content')
//
//   // oops, return timeout to fix
//   // 1100 throws an error
//   timeout(1100)
// }
//
// getFile('good.json')
//   .then(readJson)
//   .then(publishContent)
//   .then((file) => console.log('publish success'))
//   .catch((err) => console.log('error: ', err))


// **************
//
// We get back some of our control flow
// * we can use try/catch for synchronous errors, but
//   as long as we have a catch at the top level, the errors
//   will bubble up.
// * we can return values in the 'then'
// * however, promises enforce their own unique control flow
//   'then', 'catch', understanding the promise chain
//
// **************
