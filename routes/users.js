var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('grid', { title: 'U of T Timetable Creator' });
});

module.exports = router;
