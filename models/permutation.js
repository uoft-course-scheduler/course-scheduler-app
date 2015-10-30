var path = require('path');
var Section = require(path.join(__dirname, 'section'));


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


function permutate(a) {
  var permutations = [];

  for (var i = 0; i < a.length; i++) {
    var permutation = [a[i]];

    // Array of everything except the element at a[i].
    var subarrayOne = a.slice(0, i);
    var subarrayTwo = a.slice(i + 1);
    var subarray = subarrayOne.concat(subarrayTwo);

    if (subarray.length > 0) {
      permutation.concat(permutate(subarray));
    }

    permutations.push(permutation);
  }

  return permutations;
}


module.exports = Permutation;