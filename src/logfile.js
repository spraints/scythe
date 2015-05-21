var logfmt = require("logfmt");
var through = require("through");


function LogFile(stream, cb) {
  stream.on("error", function() { console.log(["error", path, arguments]); });
  var logReader = stream.pipe(logfmt.streamParser());
  logReader.pipe(through(function() { console.log(["log", arguments]) }));
}

module.exports = LogFile;
