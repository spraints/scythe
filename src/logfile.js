var logfmt = require("logfmt");
var through = require("through");
var EventEmitter = require("events").EventEmitter;

function LogFile(stream) {
  var self = this;
  var lines = [];

  stream
    .pipe(logfmt.streamParser())
    .pipe(through(function(parsed) { lines.push(parsed); }))
    .on("error", function() { self.emit("error"); })
    .on("end", function() { self.emit("end"); });

  self.lines = lines;

  return self;
}

LogFile.prototype.emit = EventEmitter.prototype.emit;
LogFile.prototype.on   = EventEmitter.prototype.on;

module.exports = LogFile;
