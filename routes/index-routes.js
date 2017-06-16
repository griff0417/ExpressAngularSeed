/*
 * Index, view, and partial routes
 */

exports.index = function(req, res) {
  res.render("index");
};

exports.view = function (req, res) {
  var name = req.params.name;
  res.render(name);
};

exports.subView = function (req, res) {
  var dir = req.params.dir;
  var name = req.params.name;
  res.render(dir + "/" + name);
};
