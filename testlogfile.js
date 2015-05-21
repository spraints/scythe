var LogFile = require("./src/logfile");

var lf = new LogFile(process.stdin);
lf.on("end", function() { console.log(lf.lines) });
