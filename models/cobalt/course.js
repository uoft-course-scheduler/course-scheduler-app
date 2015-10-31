var path = require('path');
var Section = require(path.join(__dirname, 'section'));

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

  // Convert meeting section json object to a Section object.
  for (var i = 0; i < this.meeting_sections.length; i++) {
    this.meeting_sections[i] = new Section(this.meeting_sections[i]);
  }

};




module.exports = Course;