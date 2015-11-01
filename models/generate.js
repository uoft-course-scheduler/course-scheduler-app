
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
    for (var i = 0; i < courses[0].meeting_sections.length; i++) {
      // if its a lecture section, add the course.
      if (courses[0].meeting_sections[i].code[0] == 'L') {
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
  }
}

module.exports = Generate;
