var express = require('express');
var router = express.Router();
var url = require('url');

var path = require('path');
var Cobalt = require(path.join(__dirname, '../models/cobalt/cobalt'));


router.get('/list', function(req, res, next) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  cobalt.listCourses(function(courses) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(courses));
  });

});

router.get('/generate', function(req, res, next) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  // We expect as GET parameter a list of course code seperated by comma.
  var courses = req.query.courses.split(',');

  if (courses.length < 1) {
    res.end(JSON.stringify({}));
  }

  // We want to convert the course strings to a Cobalt Course object.
  var cobaltCourses = [];

  cobalt.findCourse(courses[0], function r(result) {

    // Remove the first element from the array and add the result to the array
    // of the cobalt Course objects. Note that we got the result from the
    // callback function r. It is not related to the courses array anymore at
    // this point.
    courses.splice(0, 1);
    cobaltCourses.push(result);

    // Recursively get the rest of the courses.
    if (courses.length > 0) {
      cobalt.findCourse(courses[0], r);
    } else {
      res.end(JSON.stringify(cobaltCourses));
    }

  });

  
});


module.exports = router;
