
/**
 * The Course Class.
 * An instance of the course class contains information representing a single
 * U of T course.
 * 
 * @param {String} json a parsed json object that represents a U of T course.
 */
var Course = function(json) {
  // Copy all the json data onto this object itself.
  for (var property in json) {
    this[property] = json[property];
  }
};




module.exports = Course;