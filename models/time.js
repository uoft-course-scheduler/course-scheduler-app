'use strict';

/**
 * The Time Class.
 * This class wraps around an array and calculates the
 * time spent at school. The resulting sort can be accessed
 * as an array.
 *
 * @param {Array} a the array to calculate time.
 */

var Time = function(a) {
    this.a = time(a);
};

/**
 * Returns initial array including time spent at school.
 * @param  {Array} a  the array to calculate time.
 * @return {Array}    an array including time spent at school.
 */

function time(a) {
    var scheduleTimes = [];
    for (var i = 0; i < a.length; i++) {
        // Have variables to find the beginning and 
        // end times for each day
        var mondayStart = 24;
        var mondayEnd = 0;
        var mondayTime = 0;
        var tuesdayStart = 24;
        var tuesdayEnd = 0;
        var tuesdayTime = 0;
        var wednesdayStart = 24;
        var wednesdayEnd = 0;
        var wednesdayTime = 0;
        var thursdayStart = 24;
        var thursdayEnd = 0;
        var thursdayTime = 0;
        var fridayStart = 24;
        var fridayEnd = 0;
        var fridayTime = 0;
        var totalTime = 0;
        var schedule = a[i];

        //Get each permutation of the schedule
        for (var t = 0; t < schedule.length; t++) {
            var times = schedule[t].meeting_section.times;
            // Get each courses time
            // will continuously replace with lowest start time
            for (var j = 0; j < times.length; j++) {
                if (times[j].day == "MONDAY") {
                    if (times[j].start < mondayStart) {
                        mondayStart = times[j].start;
                    }
                    if (mondayEnd < times[j].end) {
                        mondayEnd = times[j].end;
                    }
                }
                if (times[j].day == "TUESDAY") {
                    if (times[j].start < tuesdayStart) {
                        tuesdayStart = times[j].start;
                    }
                    if (tuesdayEnd < times[j].end) {
                        tuesdayEnd = times[j].end;
                    }
                }
                if (times[j].day == "WEDNESDAY") {
                    if (times[j].start < wednesdayStart) {
                        wednesdayStart = times[j].start;
                    }
                    if (wednesdayEnd < times[j].end) {
                        wednesdayEnd = times[j].end;
                    }
                }
                if (times[j].day == "THURSDAY") {
                    if (times[j].start < thursdayStart) {
                        thursdayStart = times[j].start;
                    }
                    if (thursdayEnd < times[j].end) {
                        thursdayEnd = times[j].end;
                    }
                }
                if (times[j].day == "FRIDAY") {
                    if (times[j].start < fridayStart) {
                        fridayStart = times[j].start;
                    }
                    if (fridayEnd < times[j].end) {
                        fridayEnd = times[j].end;
                    }
                }
            }
        }

        // if no classes that day, time is 0
        if (mondayStart == 24 && mondayEnd == 0) {
            mondayTime = 0;
        } else { // else the total time that day is the end time less the start time
            mondayTime = mondayEnd - mondayStart;
        }

        if (tuesdayStart == 24 && tuesdayEnd == 0) {
            tuesdayTime = 0;
        } else {
            tuesdayTime = tuesdayEnd - tuesdayStart;
        }

        if (wednesdayStart == 24 && wednesdayEnd == 0) {
            wednesdayTime = 0;
        } else {
            wednesdayTime = wednesdayEnd - wednesdayStart;
        }

        if (thursdayStart == 24 && thursdayEnd == 0) {
            thursdayTime = 0;
        } else {
            thursdayTime = thursdayEnd - thursdayStart;
        }

        if (fridayStart == 24 && fridayEnd == 0) {
            fridayTime = 0;
        } else {
            fridayTime = fridayEnd - fridayStart;
        }

        // lol log messages.
        // console.log("monday", mondayTime);
        // console.log("tuesday", tuesdayTime);
        // console.log("wednesday", wednesdayTime);
        // console.log("thurs", thursdayTime);
        // console.log("friday", fridayTime);

        totalTime = mondayTime + tuesdayTime + wednesdayTime + thursdayTime + fridayTime;
        var timeIncluded = a[i];
        timeIncluded["time"] = totalTime;
        scheduleTimes.push(timeIncluded);
    }
  
    return scheduleTimes;
}

module.exports = Time;