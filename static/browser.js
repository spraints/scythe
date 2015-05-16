var ipc = require("ipc");
ipc.on("open-file", function(path) {
  console.log(path);
  var basename = path.toString().split("/").reverse()[0];
  var parent = document.getElementById("log-list");
  var ul = parent.firstElementChild;
  ul.innerHTML = ul.innerHTML + "<li title='" + path + "'>" + basename + "</li>";
})
