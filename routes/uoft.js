var express = require('express');
var router = express.Router();
var url = require('url');

var path = require('path');
var Cobalt = require(path.join(__dirname, '../models/cobalt/cobalt'));

// List 20 courses, skip the first 10.
router.get('/course/list', function(req, res, next) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  cobalt.listCourses(function(courses) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(courses));
  });
});

// Get the course with courseName
// example: CSC148H1F20159.
router.get('/course/name/:courseName', function(req, res, next) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  cobalt.getCourse(req.params.courseName, function(c) {
    var str = JSON.stringify(c, null, 2);
    res.write(str);

    res.end();
  });
});

// Get course by courseCode
// example: CSC301H1F
router.get('/course/code/:courseCode', function(req, res) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  cobalt.findCourse(req.params.courseCode, function(c) {
    var str = JSON.stringify(c, null, 2);
    res.write(str);

    res.end();
  });
});


// Find courses in department
// example: CSC
router.get('/search/:dept', function(req, res) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  cobalt.searchCourses(req.params.dept, function(a) {
    for (var i = 0; i < a.length; i++) {
      var str = JSON.stringify(a[i], null, 2);
      res.write(str);
    }

    res.end();
  });
});

module.exports = router;