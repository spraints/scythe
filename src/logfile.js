var fs = require("fs");
var logfmt = require("logfmt");
var through = require("through");


function LogFile(path, cb) {
  var reader = fs.createReadStream(path);
  reader.on("error", function() { console.log(["error", path, arguments]); });
  var logReader = reader.pipe(logfmt.streamParser());
  logReader.pipe(through(function() { console.log(["log", arguments]) }));
}

function LogLine(str) {
  return str;
}

module.exports = LogFile;
