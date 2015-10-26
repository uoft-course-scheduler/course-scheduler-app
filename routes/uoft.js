var express = require('express');
var router = express.Router();

var path = require('path');
var Course = require(path.join(__dirname, '../models/cobalt/course'));
var Building = require(path.join(__dirname, '../models/cobalt/building'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;