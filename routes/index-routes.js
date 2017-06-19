/*
 * Index routes to serve the following:
 * '/',
 * '/<view_name>',
 * '/<directory_name>/<view_name>'
 *
 * All other routes are handled by angular.
 */

// Handles the root route: '/'
exports.index = function(req, res) {
  res.render("index");
};

// Handles a basic view route: '/<view_name>'
exports.view = function (req, res) {
  var name = req.params.name;
  res.render(name);
};

// Handles a sub-view route: '/<directory_name>/<view_name>'
exports.subView = function (req, res) {
  var dir = req.params.dir;
  var name = req.params.name;
  res.render(dir + "/" + name);
};
