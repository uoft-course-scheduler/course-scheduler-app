
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

  // Convert all times from seconds since midnight to hours since midnight
  for (var i = 0; i < this.times.length; i++) {
    this.times[i].start = this.times[i].start / 3600;
    this.times[i].end = this.times[i].end / 3600;
    this.times[i].duration = this.times[i].duration / 3600;
  }
};




module.exports = Section;
