var fs = require("fs");
var Parser = require("jison").Parser;

var grammar = {
  lex: {
    rules: [
      ["[ \\t]", "/* skip space */"],
      ["[\\r\\n]+", "return 'EOL';"],
      ["[^=\\s]+", "return 'TOKEN';"],
      ["=", "return 'EQL'"]
    ]
  },

  bnf: {
    "lines": [ "lines line", "" ],
    "line": [ "fields EOL" ],
    "fields": [ "fields field", "field" ],
    "field": [ "TOKEN EQL value", "TOKEN" ],
    "value": [ "TOKEN", "TOKEN EQL", "TOKEN EQL value" ]
  }
};

var parser = new Parser(grammar)

function LogFile(path, cb) {
  var raw = fs.readFileSync(path, "binary");
  console.log(parser.parse(raw));
  // var reader = fs.createReadStream(path);
  // var state = START_LINE;
  // var buffer;
  // reader.on("data", function(chunk) {
  //   while (chunk.length > 0) {
  //     if (chunk[0] == " " || chunk[0] == "\t") {
  //       if (state == VALUE) {}
  //     }
  //   }
  //   buffer = buffer + chunk;
  //
  // });
  // reader.resume();

  // Object.defineProperty(this, "path", { get: function() { return path; } });
  // Object.defineProperty(this, "fields", { get: function() { return fields; } });
  // Object.defineProperty(this, "records", { get: function() { return records; } });
}

function LogLine(str) {
  return str;
}

module.exports = LogFile;
