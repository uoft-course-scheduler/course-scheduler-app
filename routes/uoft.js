/**
 * EXAMPLE PAGE
 *
 * This is an example of how the cobalt API can be called.
 */

var express = require('express');
var router = express.Router();

var path = require('path');
var Cobalt = require(path.join(__dirname, '../models/cobalt/cobalt'));

// List 20 courses, skip the first 10.
router.get('/list', function(req, res, next) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  cobalt.listCourses(function(a) {
    for (var i = 0; i < a.length; i++) {
      var str = JSON.stringify(a[i], null, 2);
      res.write(str);
    }

    res.end();
  }, 20, 10);

});


// Get the course with the id CSC148H1F20159.
router.get('/get', function(req, res, next) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  cobalt.getCourse('CSC148H1F20159', function(c) {
    var str = JSON.stringify(c, null, 2);
    res.write(str);
    res.end();
  });

});



module.exports = router;
