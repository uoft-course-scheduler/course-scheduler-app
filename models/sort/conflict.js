'use strict';

/**
 * The Conflict Class.
 * This class wraps around an array and calculates the
 * conflicts of the schedule. The resulting sort can be accessed
 * as an array.
 *
 * @param {Array} a the array to calculate conflicts.
 */

var Conflict = function(a) {
  // Make a copy of the array, instead of using a reference.
  this.a = a.slice();
};

Conflict.prototype.sort = function() {
  this.a = conflict(a);
  return this.a;
};

/**
 * Returns the time of conflict between two classes.
 * @param  {Array} course1  the array of the first course.
 * @param  {Array} course2  the array of the second course.
 * @return {int}   an integer which has the time of conflicts.
 */
function calculateConflict(course1, course2){
    var times1 = course1.meeting_section.times;
    var times2 = course2.meeting_section.times;
    var conflictTime = 0;
    for (var i = 0; i < times1.length; i++){
        for (var j = 0; j < times2.length; j++){
            if (times1[i].day == times2[j].day){
                var conflict = isConflict(times1[i], times2[j]);
                if (conflict){
                    conflictTime += calculateTime(times1[i], times2[j]);
                    break;
                }
            }
        }
    }
    return conflictTime;
}

/**
 * Returns boolean value of whether there is a conflict between two courses.
 * @param  {Array} time1 the array including the times of the first course.
 * @param  {Array} time2 the array including the times of the second course.
 * @return {bool} the value showing if there is a conflict.
 */
function isConflict(time1, time2){
    if (time1.start < time2.end && time1.end > time2.start){
        return true;
    }
    return false;
}

/**
 * Returns time value of conflict
 * @param  {Array} time1 the array including the times of the first course.
 * @param  {Array} time2 the array including the times of the second course.
 * @return {bool} the time value of the conflict.
 */
function calculateTime(time1, time2){
    var conflictTime = 0;
    var conflictStart = time1.start;
    var conflictEnd = time2.end;
    while (conflictStart < conflictEnd){
        conflictTime++;
        conflictStart++;
    }
    return conflictTime;
}
/**
 * Returns initial array including time spent at school.
 * @param  {Array} a  the array to calculate conflicts.
 * @return {Array}    an array including conflicts in the schedule.
 */

function conflict(a) {
    var scheduleConflict = [];
    for (var i = 0; i < a.length; i++) {
        var conflictTime = 0;
        var schedule = a[i];
        //Get each permutation of the schedule
        for (var t = 0; t < schedule.length - 1 ; t++) {
            for (var j = 1; j < schedule.length; j++)
                conflictTime += calculateConflict(schedule[t], schedule[j]);
        }

        var conflictIncluded = a[i];
        conflictIncluded["conflict"] = conflictTime;
        scheduleConflict.push(conflictIncluded);
    }
  
    return scheduleConflict;
}

module.exports = Conflict;