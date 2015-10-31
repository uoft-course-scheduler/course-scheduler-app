'use strict';

/**
 * The Permutation Class.
 * This class wraps around an array and creates the permutation of the array. 
 * The resulting permutation can then be retrieved again in array form.
 * 
 * @param {Array} a the array to create a permutation out of.
 */
var Permutation = function(a) {
  this.a = permutate(a);
};


/**
 * Returns the permutation of a given array.
 * @param  {Array} a  the array to get the permutation of.
 * @return {Array}    an array of permutationts of a.
 */
function permutate(a) {
  if (a.length <= 1) {
    return [a];
  }

  // Final results.
  var permutations = [];

  for (var i = 0; i < a.length; i++) {
    var elementArray = a.slice(i, i + 1);

    // Get remaining elements.
    var before = a.slice(0, i);
    var after = a.slice(i + 1);
    var remaining = before.concat(after);

    // Recursively get permutation of remaining elements.
    var subPermutations = permutate(remaining);
    
    for (var j = 0; j < subPermutations.length; j++) {
      permutations.push(elementArray.concat(subPermutations[j]));
    }

  }

  return permutations;
}

Permutation.prototype.toArray = function() {
  return this.a;
};


module.exports = Permutation;