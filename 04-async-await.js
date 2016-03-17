var fs = require('fs')

// We can await promises! So, the promises we
// created earlier can be re-used

// function readFile(filename, enc) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, enc, (err, result) => {
//       if (err) reject(err)
//       else resolve(result)
//     })
//   })
// }
//
// function timeout(delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if(delay === 1100) return reject(new Error('something went wrong'))
//       else resolve()
//     }, delay)
//   })
// }

// We are familiar with them now, so let's use the
// uncaughtException and unhandledRejection

// process.on('uncaughtException', (err) => {
//   console.error('uncaughtException', err)
//   // console.error('stack', err.stack)
//
//   process.nextTick(() => { process.exit(1) })
// })
//
// process.on('unhandledRejection', (reason, p) => {
//   console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
//   // application specific logging, throwing an error, or other logic here
// });

// 01 - good.json
// note: we can now await

// function readJson(filename) {
//   return readFile(filename, 'utf8')
//     .then(JSON.parse)
// }
//
// (async () => {
//   let json = await readJson('good.json')
//
//   console.log('json result', json)
//
//   console.log('waiting...')
//   await timeout(2000)
//
//   console.log('done')
// })()

// 02 - good.json
// note: we can convert readJson to an async function

// async function readJson(filename) {
//   let content = await readFile(filename, 'utf8')
//   let parsedContent = JSON.parse(content)
//
//   return parsedContent
// }
//
// (async () => {
//   let json = await readJson('good.json')
//
//   console.log('json result', json)
//
//   console.log('waiting...')
//   await timeout(2000)
//
//   console.log('done')
// })()

// 03 - bad.json
// note: similar to promises, you have to
// try/catch at the top level to get your errors

// async function readJson(filename) {
//   let content = await readFile(filename, 'utf8')
//   let parsedContent = JSON.parse(content)
//
//   return parsedContent
// }
//
// (async () => {
//   let json = await readJson('bad.json')
//
//   console.log('json result', json)
// })()

// 04 - bad.json
// note: now we have the error

// async function readJson(filename) {
//   let content = await readFile(filename, 'utf8')
//   let parsedContent = JSON.parse(content)
//
//   return parsedContent
// }
//
// (async () => {
//   let json
//
//   try {
//     json = await readJson('bad.json')
//     console.log('bad, no result', json)
//   } catch (err) {
//     console.log('error reading json', err)
//   }
// })()

// 05 - bad.json
// note: don't break the promise chain

// async function getFile(filename) {
//   console.log('getting file')
//
//   await timeout(1000)
//
//   return filename
// }
//
// async function readJson(filename) {
//   console.log('parsing file')
//   let content = await readFile(filename, 'utf8')
//   let parsedContent = JSON.parse(content)
//
//   return parsedContent
// }
//
// async function publishContent(content) {
//   console.log('publishing content')
//
//   // oops, await timeout to fix
//   // 1100 throws an error
//   timeout(1100)
// }
//
// (async () => {
//   try {
//     let filename = await getFile('good.json')
//     let json = await readJson(filename)
//     let content = await publishContent(json)
//     console.log('publish success')
//   } catch(err) {
//     console.log('error: ', err)
//   }
// })()

// **************
//
// We get our 'normal' control flow
// * we can use try/catch for synchronous and async/await
//   errors
// * we can return values
// * we still need a top level catch
// * we are awaiting promises, so we have to worry about
//   breaking the promise chain
//
// **************
