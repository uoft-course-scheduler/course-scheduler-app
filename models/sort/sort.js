var path = require('path');
var TimeSort = require(path.join(__dirname, 'least-time'));
var Conflict = require(path.join(__dirname, 'conflict'));

/**
 * The Sort Class.
 * This utilizes the strategy pattern.
 *
 * This class takes in a string representing the strategy that will be used for
 * sorting. Then, calling the sort method will use the corresponding strategy
 * to sort a given Time object, and return the result.
 * 
 * @param {String} strategy the strategy to use.
 */
var Sort = function(strategy) {
  if (strategy === "conflict") {
    this.sorter = Conflict;
  } else if (strategy === "leastTime") {
    this.sorter = TimeSort;
  }
}


Sort.prototype.sort = function(a) {
  var algorithm = new this.sorter(a);
  return algorithm.sort();
};

module.exports = Sort;