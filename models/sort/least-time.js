/**
* The TimeSort Class.
* This class sorts a schedule depending on the time.
*
* @param {Array} a the array to be sorted
*/

var TimeSort = function(a) {
  // Make a copy of the array, instead of using a reference.
  this.a = a.slice();
}

TimeSort.prototype.sort = function() {

  this.a.sort(function(a, b) {
    return parseFloat(a.time) - parseFloat(b.time);
  });

  return this.a;
};

module.exports = TimeSort;