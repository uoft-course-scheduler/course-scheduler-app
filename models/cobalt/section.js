
/**
 * The Section Class.
 * An instance of the section class contains information representing a meeting
 * section belonging to a U of T course.
 * 
 * @param {String} json a parsed json object that represents a U of T course.
 */
var Section = function(json) {
  // Copy all the json data onto this object itself.
  for (var property in json) {
    this[property] = json[property];
  }
};




module.exports = Section;