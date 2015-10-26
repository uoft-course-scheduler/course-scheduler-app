var http = require('http');
var https = require('https');
var querystring = require('querystring')

/**
 * The options for GETing a list of all courses.
 * 
 * @type {Object}
 */
var LIST_COURSES = {
  host: 'cobalt.qas.im',
  port: 443,
  path: '/api/1.0/courses/list',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

/**
 * The options for GETing information for a specific course.
 * Must replace the :id in path property with desired id.
 * 
 * @type {Object}
 */
var SHOW_COURSES = {
  host: 'cobalt.qas.im',
  port: 443,
  path: '/api/1.0/courses/show/:id',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};


/**
 * The options for GETing a list of course by a search criteria.
 *
 * @type {Object}
 */
var SEARCH_COURSES = {
  host: 'cobalt.qas.im',
  port: 443,
  path: '/api/1.0/courses/search',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};


/**
 * The Course Class.
 * An instance of the course class contains information representing a single
 * U of T course.
 * 
 * @param {String} key cobalt API key.
 */
var Course = function(key) {
  this.key = key;
};


/**
 * Returns an array of no more than num elements where each element is a Course
 * object that represents a single U of T course. The array is created from
 * a list of all registered U of T courses on Cobalt.
 * 
 * @static
 * @param {Number} num optional. defaults to 10. The number of courses to return
 *                               in the array, max 200.
 * @return {Array} an array of Course objects.
 */
Course.list = function(num) {
  num = num || 10;

  // The 200 limit is imposed by the Cobalt API.
  if (num > 200) {
    num = 200;
  }



}



function get(opt, q, callback) {
  // Since options is supposed to be a constant, we don't want to mutate it.
  var options = opt;

  // If any key value pair can be passed in a RESTful way (as opposed to a 
  // query string), then do that instead.
  for (var key : q) {
    var search = ':' + key;
    if (options.path.indexOf(search) > -1) {
      options.path.replace(search, q.key);

      // Faster than delete q.key;
      // http://stackoverflow.com/a/21735614/4833127
      q.key = undefined;
    }
  }

  var query = querystring.stringify(q);
  options.path = options.path + '?' + query;

  http.request(options, function(response) {
  	var data = '';

  	/**
  	 * Handler for when data has been received.
  	 */
  	response.on('data', function (chunk) {
  	  data += chunk;
  	});

  	/**
  	 * Handler for when the whole response has been received.
  	 */
  	response.on('end', function () {
      callback(str);
  	});
  }).end();
}