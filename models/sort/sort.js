var path = require('path');
var Time = require(path.join(__dirname, '../time'));
var TimeSort = require(path.join(__dirname, 'least-time'));
var Conflict = require(path.join(__dirname, 'conflict'));

/**
 * The Sort Class.
 * This utilizes the strategy pattern.
 *
 * This class takes in a string representing the strategy that will be used for
 * sorting. Calling the sort() method will use the corresponding strategy
 * to sort a given Time object, and return the result.
 *
 * All strategies must implement the sort(a) method that takes an array a and
 * returns a sorted version of a.
 * 
 * @param {String} strategy the strategy to use.
 */
var Sort = function(strategy) {

  // We set this.sorter to be the strategy we want to use. However, we do not
  // create a new instance of it here. This is so that we do not have to
  // pass in the time object upon instantiation of the Sort object.
  if (strategy === "conflict") {
    this.sorter = Conflict;
  } else if (strategy === "leastTime") {
    this.sorter = TimeSort;
  } else {
    throw "Unsupported Strategy";
  }
}

/**
 * Return an array representing the possible permutation of each course given 
 * by the Time object in sorted order.
 * 
 * @param  {Time}   time the time object containing permutations of courses.
 * @return {Array}       an array representing the time object sorted by this
 *                       object's strategy.
 */
Sort.prototype.sort = function(time) {

  if (!(time instanceof Time)) {
    throw "Invalid Argument";
  }

  // time.a is the inner array representing the permutation of the courses in
  // the Time object.
  var algorithm = new this.sorter(time.a);

  return algorithm.sort();
};

module.exports = Sort;