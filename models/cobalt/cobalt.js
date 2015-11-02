var https = require('https');
var querystring = require('querystring');

var path = require('path');
var Course = require(path.join(__dirname, 'course'));
var Building = require(path.join(__dirname, 'building'));

/**
 * The options for GETing a list of all courses.
 * 
 * @type {Object}
 */
var LIST_COURSES = {
  host: 'cobalt.qas.im',
  port: 443,
  path: '/api/1.0/courses/list',
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
  headers: {
    'Accept': 'application/json'
  }
};

/**
 * The Cobalt Class.
 * This is essentially utilizes the factory pattern.
 *
 * This class will create instances of Course or Building, or arrays of Course
 * or Building objects. 
 * 
 * @param {String} key cobalt API key.
 */
var Cobalt = function(key) {
  this.key = key;
};

/**
 * Creates an array of no more than limit elements where each element is a 
 * Course object that represents a single U of T course. The array is created 
 * from a list of all registered U of T courses on Cobalt, after skipping the
 * first skip courses. The created array is passed as argument to the callback 
 * function.
 * 
 * @static
 * @param {Function} callback the function to call when the array is created.
 * @param {Number}   limit    optional. defaults to 10. The number of courses to 
 *                            return in the array, max 200.
 * @param {Number}   skip     optional. defaults to 0. The number of courses to 
 *                            skip from the list of all courses.
 * @return {void}
 */
Cobalt.prototype.listCourses = function(callback, limit, skip) {
  limit = limit || 10;
  skip = skip || 0;

  // The 200 limit is imposed by the Cobalt API.
  if (limit > 200) {
    limit = 200;
  }

  var query = {
    limit : limit, 
    skip : skip,
    key : this.key
  };

  get(LIST_COURSES, function(data) {
    // On error.
    if (data === null) {
      callback([]);
      return;
    }


    var courses = [];
    for (var i = 0; i < data.length; i++) {
      var course = new Course(data[i]);
      courses.push(course);
    }

    callback(courses);

  }, query);
};

/**
 * Passes the course with the specified id as argument to the callback 
 * function. Note that the id of the course is not the same as the course code.
 * To get a course by course code, see Cobalt.prototype.findCourse().
 *
 * @see    Cobalt.prototype.findCourse();
 * @param  {[type]}   id       the id of the course.
 * @param  {Function} callback the function to call with the course passed as
 *                             argument.
 * @return {void}
 */
Cobalt.prototype.getCourse = function(id, callback) {
  var query = {
    id : id,
    key : this.key
  };

  get(SHOW_COURSES, function(data) {
    // On error.
    if (data === null) {
      callback({});
      return;
    }

    var course = new Course(data);

    callback(course);

  }, query);
};

/**
 * Passes a single course with the specified course code as argument to the
 * callback function. If multiple courses are found, only the first course will
 * be passed. Although there should never be two courses with the same code.
 * 
 * @param  {String}   code     the course code.
 * @param  {Function} callback the function to call with the course passed as
 *                             argument.
 * @return {void}
 */
Cobalt.prototype.findCourse = function(code, callback) {
  var query = {
    q : '"' + code + '"',
    limit : 1,
    key : this.key
  };

  get(SEARCH_COURSES, function(data) {
    // On error or not found.
    if (data === null || data.length < 1) {
      callback({});
      return;
    }

    var course = new Course(data[0]);

    callback(course);

  }, query);
};

/**
 * Passes an array of Courses with either it's course code, course name or 
 * course description matching with search to the callback function.
 * 
 * @param  {String}   search   the code, name, or description to search on.
 * @param  {Function} callback the function to call with the array of courses
 *                             passed as argument.
 * @param {Number}    limit    optional. defaults to 10. The number of courses 
 *                             to return in the array, max 200.
 * @param {Number}    skip     optional. defaults to 0. The number of courses to 
 *                             skip from the list of all courses.
 * @return {void}
 */
Cobalt.prototype.searchCourses = function(search, callback, limit, skip) {
  limit = limit || 10;
  skip = skip || 0;

  // The 200 limit is imposed by the Cobalt API.
  if (limit > 200) {
    limit = 200;
  }


  var query = {
    q : search,
    limit : limit,
    skip : skip,
    key : this.key
  };

  get(SEARCH_COURSES, function(data) {
    // On error.
    if (data === null) {
      callback([]);
      return;
    }


    var courses = [];
    for (var i = 0; i < data.length; i++) {
      var course = new Course(data[i]);
      courses.push(course);
    }

    callback(courses);

  }, query);
};


/**
 * Similar to search but uses the filter function from the cobalt api
 * 
 * @param  {String}   search   the code, name, or description to search on.
 * @param  {Function} callback the function to call with the array of courses
 *                             passed as argument.
 * @param {Number}    limit    optional. defaults to 10. The number of courses 
 *                             to return in the array, max 200.
 * @param {Number}    skip     optional. defaults to 0. The number of courses to 
 *                             skip from the list of all courses.
 * @return {void}
 */
Cobalt.prototype.filterCourses = function(search, callback, limit, skip) {
  limit = limit || 10;
  skip = skip || 0;

  // The 200 limit is imposed by the Cobalt API.
  if (limit > 200) {
    limit = 200;
  }


  var query = {
    q : search,
    limit : limit,
    skip : skip,
    key : this.key
  };

  var FILTER_COURSES = {
  host: 'cobalt.qas.im',
  port: 443,
  path: '/api/1.0/courses/filter',
  headers: {
    'Accept': 'application/json'
  }
};


  get(FILTER_COURSES, function(data) {
    // On error.
    if (data === null) {
      callback([]);
      return;
    }


    var courses = [];
    for (var i = 0; i < data.length; i++) {
      var course = new Course(data[i]);
      courses.push(course);
    }

    callback(courses);

  }, query);
};

/**
 * Send a GET request to the http resource as specified in options. Parses the 
 * received data as json and calls the callback function with the parsed json
 * as argument. If an error occurs, null will be passed to the callback
 * function as the argument instead.
 * 
 * If the path to the http resource is RESTful, specify the RESTful portion of
 * the path with the syntax :x where x is any alphanumeric string. Then, pass
 * the key x along with the desire value as a property of q.
 * 
 * @param  {Object}   opt      specifies the host, path, port, and method used.
 * @param  {Function} callback the function that will be called when the request
 *                             succeeds,
 * @param  {Object}   q        optional. The query key value pairings.
 * @return {void}
 */
function get(opt, callback, q) {

  // Defaults to no query.
  if (typeof q === 'undefined') {
    q = {};
  }

  // Since options is supposed to be a constant, we don't want to mutate it.
  var options = {};
  for (var property in opt) {
    options[property] = opt[property];
  }

  // This function only supports GET.
  options.method = 'GET';

  // If any key value pair can be passed in a RESTful way (as opposed to a 
  // query string), then do that instead.
  for (var key in q) {
    var search = ':' + key;
    if (options.path.indexOf(search) > -1) {
      options.path = options.path.replace(search, q[key]);

      delete q[key];
    }
  }

  var query = querystring.stringify(q);
  options.path = options.path + '?' + query;

  var request = https.request(options, function(response) {
    var data = '';

    /**
     * Handler for when data has been received.
     */
    response.on('data', function(chunk) {
      data += chunk;
    });

    /**
     * Handler for when the whole response has been received.
     */
    response.on('end', function() {
      try {
        var json = JSON.parse(data);

        if (typeof json.error !== 'undefined') {
          console.log('API ERROR ' + json.error);
          callback(null);
          return;
        }

        callback(json);
      } catch(e) {
        console.log('PARSE ERROR ' + options.host + options.path + ' ' + e);
        callback(null);
      }      
    });
  });

  /**
   * Handler for when the http request encounters an error.
   */
  request.on('error', function(e) {
    console.log('REQUEST ERROR ' + options.host + options.path + ' ' + e);
    callback(null);
  });

  /**
   * Handler for when the http request time out.
   */
  request.on('timeout', function() {
    console.log('REQUEST TIMEOUT ' + options.host + options.path + ' ' + e);
    request.abort();
    callback(null);
  });

  request.setTimeout(5000);
  request.end();

}

module.exports = Cobalt;