var fs = require("fs");


function LogFile(path, cb) {
  var reader = fs.createReadStream(path);
  var state = START_LINE;
  var buffer;
  reader.on("data", function(chunk) {
    // todo - finish "record" if unquoted \r or \n
    for (var i = 0; i < chunk.length; i++) {
      var ch = chunk[i];
      if (state == START) {
        if (ch.match(/\S/)) {
          buffer = ch;
          state = KEY;
        }
      } else if (state == KEY) {
        // go until a "="
      } else if (state == EQL) {
        // switch to value, quoted-value, or back to START
      } else if (state == VALUE) {
        // go until whitespace
      } else if (state == QUOTED VALUE) {
        // go until unescaped quote
      }
    }
  });
  reader.resume();

  // Object.defineProperty(this, "path", { get: function() { return path; } });
  // Object.defineProperty(this, "fields", { get: function() { return fields; } });
  // Object.defineProperty(this, "records", { get: function() { return records; } });
}

function LogLine(str) {
  return str;
}

module.exports = LogFile;
