var express = require('express');
var router = express.Router();
var url = require('url');

var path = require('path');
var Cobalt = require(path.join(__dirname, '../models/cobalt/cobalt'));
var Generate = require(path.join(__dirname, '../models/generate'));
var Sort = require(path.join(__dirname, '../models/sort/sort'));
//var Conflict = require(path.join(__dirname, '../models/conflict'));


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
router.get('/filter/:q', function(req, res) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  cobalt.filterCourses(req.params.q, function(a) {
    // for (var i = 0; i < a.length; i++) {
    //   // var str = JSON.stringify(a[i], null, 2);
    //   // res.write(str);
      res.write(JSON.stringify(a));
    // }

    res.end();
  });
});

//Filter courses
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


router.get('/course/generate', function(req, res, next) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');

  // We expect as GET parameter a list of course code seperated by comma.
  var courses = req.query.courses.split(',');

  // There will also be an optional GET parameter that contains the "filter" to
  // use for sorting the timetable. Defaults to least conflict.
  var filter = req.query.filter || 'conflict';


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

      var generate = new Generate(cobaltCourses);

      var sort;
      try {
        sort = new Sort(filter);
      } catch(ex) {
        // If the given strategy is unsupported (e.g. someone sent a custom GET
        // query with an unsupported filter), we will default to conflict.
        sort = new Sort('conflict');
      }
      
      var result = sort.sort(generate);
      
      // for here we should be able to do something like 
      // generate the permutations and send it to the client for display
      res.end(JSON.stringify(result.slice(0,10)));
    }

  });

  
});


module.exports = router;