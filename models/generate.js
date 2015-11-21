
var permutations = [];

/**
 * Generates a permutation of courses
 * 
 * @param a : json object containing the selected courses
 */
 var Generate = function(a) {
  return gen(a);
}

// calls helper to generate permutations
function gen(a) {
  permutations = [];
  var courseList = []

  // each course is an entry so:
  for (var i = 0; i < a.length; i++) {
    courseList.push(a[i]);
  }

  reduce(courseList);

  // call helper to generate permutations
  permutation(courseList, []);

  return permutations;
}


// arrangement is the permutation of courses
// starts empty, fills up on the way down
// then gets pushed to the permutations list on deepest level
function permutation(courses, arrangement) {
  if (courses.length == 0) {
    permutations.push(arrangement);
  } else {
      // check to see that course is not empty i.e wrong course
      if (courses[0].meeting_sections != null){
        //check to see that there are meeting sections for the course
        if (courses[0].meeting_sections.length != 0){
          for (var i = 0; i < courses[0].meeting_sections.length; i++) {
            // if its a lecture section, add the course.
            if (courses[0].meeting_sections[i].code[0] == 'L' && courses[0].meeting_sections[i].times.length != 0) {
              var course = {
                  "meeting_section" : courses[0].meeting_sections[i],
                  "course_code" : courses[0].code
              };
              var newArrangement = arrangement.slice(0);
              newArrangement.push(course);

              permutation(courses.slice(1), newArrangement);
            } else {
            // tutorial, skip this iteration
            continue; 
            } 
          }
        } else {
          //no meeting section, alert user, continue to next course
          permutation(courses.slice(1), arrangement);
          }
      }
      else{
        //wrong course, alert user, continue to next course
        permutation(courses.slice(1), arrangement);
      }
    }
    
}

function reduce(courses){
  for (var i = 0; i < courses.length; i++){//get one course
          var toDelete = [];
          var currentCourse = courses[i];
          var meetingSections = currentCourse.meeting_sections;
          if (meetingSections == undefined){
            continue;
          }
          //get meeting sections to compare
          for (var j = 0; j < meetingSections.length - 1; j++){
            for (var k = j+1; k < meetingSections.length; k++){
              section1 = meetingSections[j];
              section2 = meetingSections[k];
              if (section1.code.charAt(0) == "T" || section2.code.charAt(0) == "T"){
                continue;
              }
              if (section1.times.length != section2.times.length){//meeting sections have different times, no need to compare
                continue;
              }
              for (var l = 0; l < section1.times.length; l++){
                //make sure the meeting section times and instructors are the same
                if ( section1.times.location != section2.times.location || section1.times[l].day != section2.times[l].day || 
                  section1.times[l].start != section2.times[l].start || section1.times[l].end != section2.times[l].end){
                  break;
                }
                //meeting sections are the same
                if (l == section1.times.length - 1){
                  section2.code = section2.code + "/" + section1.code.substr(0,5);
                  toDelete.push(j);
                }
              }
            }
          }
          //remove duplicates from the todelete section. This is in the case where there are more than 
          //2 section codes which have the same time.
          var results = [];
          for (var count = 0; count < toDelete.length - 1; count++) {
              if (toDelete[count + 1] == toDelete[count]) {
                  toDelete.splice(count, 1);
              }
          }
          //remove the duplicates in backwards order
          for (var m = toDelete.length - 1; m >= 0; m--){
            var del = toDelete[m];
            courses[i].meeting_sections.splice(del, 1);
          }
        }
}

module.exports = Generate;
