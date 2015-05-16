function LogFile(path) {
  var fields;
  var records;
  var loaded = false;

  function _load() {
    // todo
  }

  Object.defineProperty(this, "path", { get: function() { return path; } });
  Object.defineProperty(this, "fields", { get: function() { _load(); return fields; } });
  Object.defineProperty(this, "records", { get: function() { _load(); return records; } });
}

module.exports = LogFile;
