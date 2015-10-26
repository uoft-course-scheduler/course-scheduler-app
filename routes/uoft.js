var express = require('express');
var router = express.Router();

var path = require('path');
var Cobalt = require(path.join(__dirname, '../models/cobalt/cobalt'));
//var Course = require(path.join(__dirname, '../models/cobalt/course'));
//var Building = require(path.join(__dirname, '../models/cobalt/building'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  var cobalt = new Cobalt('Yu6lYuyoUmSjWVMShglIbQKbKPTZYwxk');
  cobalt.listCourses(function(a) {
    console.log(a.length);
  }, 20, 10);
  res.send('respond with a resource');
});

module.exports = router;