/**
* The TimeSort Class.
* This class sorts a schedule depending on the time.
*
* @param {Array} a the array to be sorted
*/

var Sort = function(a, filter) {
	if (filter == "time"){
		this.a = timeSort(a);
	}
	if (filter == "conflict"){
		this.a = conflictSort(a);
	}
}

/**
 * Returns initial array sorted by least time spent at school.
 * @param  {Array} a  the array to sort.
 * @return {Array}    an array sorted by least time spent at school.
 */
function timeSort(a){
	a.sort(function(a, b){
		return parseFloat(a.time) - parseFloat(b.time);
	});
	return a;
}

function conflictSort(a){
	a.sort(function(a, b){
		return parseFloat(a.conflict) - parseFloat(b.conflict);
	});
	return a;
}

module.exports = Sort;