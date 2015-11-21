var path = require('path');
var Conflict = require(path.join(__dirname, 'conflict'));

'use strict';

/**
 * The Evening Class.
 * This class wraps around an array and calculates the
 * schedules with the most evening classes. The resulting 
 * sort can be accessed as an array.
 *
 * @param {Array} a the array to calculate schedules with evening classes.
 */

var Evening = function(a) {
  // Make a copy of the array, instead of using a reference.
  this.a = a.slice();
};

Evening.prototype.sort = function() {
  this.a = new Conflict(this.a);
  this.a.sort();
  this.a = evening(this.a.a);
  this.a.sort(function(a, b){
    return parseFloat(a.evening) - parseFloat(b.evening);
  });
  return this.a;
};

function evening(a){
	var scheduleEvenings = [];
	for (var i = 0; i < a.length; i++) {
		schedule = a[i];
		var eveningTime = 10;
		for (var t = 0; t < schedule.length; t++) {
	      var times = schedule[t].meeting_section.times;
	      // Get each courses time
	      // will continuously replace with lowest start time
	      for (var j = 0; j < times.length; j++) {
	       	if (times[j].start > 17){
	        		eveningTime -= 2;
	        	}
	      }
	   }
	 
	   eveningTime += (schedule.conflict * 3);
	   var eveningIncluded = schedule;
	   eveningIncluded["evening"] = eveningTime;
	   scheduleEvenings.push(eveningIncluded);
	}

	return scheduleEvenings;
}



module.exports = Evening;