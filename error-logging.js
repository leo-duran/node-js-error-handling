var http = require('http');
var bunyan = require('bunyan');
var util = require('util');

var log = bunyan.createLogger({
    name: 'myserver',
    serializers: {
        err: bunyan.stdSerializers.err,   // <--- use this
    }
});

try {
    throw new TypeError('boom');
} catch (err) {
    log.warn({err: err}, 'operation went boom: %s', err)   // <--- here
}

// output
{
  "name":"myserver",
  "hostname":"Khazix",
  "pid":7220,
  "level":40,
  "err":{
    "message":"boom",
    "name":"TypeError",
    "stack":`TypeError: boom
      \n    at Object.<anonymous> (C:\\dev\\error-handling\\error-logging.js:13:11)
      \n    at Module._compile (module.js:398:26)
      \n    at Object.Module._extensions..js (module.js:405:10)
      \n    at Module.load (module.js:344:32)
      \n    at Function.Module._load (module.js:301:12)
      \n    at Function.Module.runMain (module.js:430:10)
      \n    at startup (node.js:141:18)
      \n    at node.js:1003:3`
  },
  "msg":"operation went boom: TypeError: boom",
  "time":
  "2016-02-28T06:21:09.521Z",
  "v":0
}
