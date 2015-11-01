course =
   {
      "meeting_section" :
      	[{
	         "code":"L5101",
	         "size":85,
	         "enrolment":0,
	         "times":[
	            {
	               "day":"MONDAY",
	               "start":18,
	               "end":21,
	               "duration":3,
	               "location":"BA 1200"
	            }
	         ],
	         "instructors":[
	            "Y Freund"
	         ]
	      }],
      "course_code":"CSC301H1F"
   }


courses = 
	[
   [
      {
         "meeting_section":{
            "code":"L0101",
            "size":85,
            "enrolment":0,
            "times":[
               {
                  "day":"MONDAY",
                  "start":12,
                  "end":13,
                  "duration":1,
                  "location":"BA 1200"
               },
               {
                  "day":"WEDNESDAY",
                  "start":12,
                  "end":13,
                  "duration":1,
                  "location":"BA 1200"
               },
               {
                  "day":"FRIDAY",
                  "start":12,
                  "end":13,
                  "duration":1,
                  "location":"BA 1200"
               }
            ],
            "instructors":[
               "M Zaleski"
            ]
         },
         "course_code":"CSC301H1F"
      },
      {
         "meeting_section":{
            "code":"L0101",
            "size":160,
            "enrolment":0,
            "times":[
               {
                  "day":"MONDAY",
                  "start":11,
                  "end":12,
                  "duration":1,
                  "location":"LM 159"
               },
               {
                  "day":"TUESDAY",
                  "start":9,
                  "end":11,
                  "duration":2,
                  "location":"LM 162"
               },
               {
                  "day":"WEDNESDAY",
                  "start":11,
                  "end":12,
                  "duration":1,
                  "location":"LM 159"
               },
               {
                  "day":"FRIDAY",
                  "start":11,
                  "end":12,
                  "duration":1,
                  "location":"LM 159"
               }
            ],
            "instructors":[
               "G Baumgartner"
            ]
         },
         "course_code":"CSC165H1F"
      }
   ]
]



function renderCourse(json, code) {
	var sections = json.meeting_section,
		section;
	for (var i=0; i<sections.length; i++) {
		if (sections[i].code == code) {
			section = sections[i];
			break;
		}
	}

	if (sections) {
		insertSection(section);
	}
}

function insertSection(section) {
	var times = section.times;

	for (var j=0; j<times.length; j++) {
		var day = "." + times[j].day[0].toUpperCase() + times[j].day.substr(1).toLowerCase(),
			time = times[j].start,
			start = times[j].start,
			end = times[j].end,
			center = ((end - start  - 1) / 2) + start, // Subtracting 1 because it doesn't include the end hour
			even = ( (times[j].duration % 2) == 0);

		while (time != end) {
			var hourRow = $("." + time);
			hourBlock = hourRow.children(day);
			hourBlock.css("border", "none");
			hourBlock.css("background-color", "#c0dfd9");
			hourBlock.css("padding", "5px");
			time += 1;
		}

		if (even) {
			var firstHalf = Math.floor(center),
				secondHalf = Math.ceil(center),
				firstHalfBlock = $("." + firstHalf).children(day), // Doing same thing as hourBlock -> hourRow just all in 1 line
				secondHalfBlock = $("." + secondHalf).children(day);
				firstHalfBlock.html(section.code + "<br>" + times[j].location);
				secondHalfBlock.html(section.instructors);
		} else {
			centerBlock = $("." + center).children(day);
			centerBlock.html(section.code + "<br>" + times[j].location + "<br>" + section.instructors);
		}
	}
}

function renderCourses(json){
	var schedule = json[0];
	for (var i = 0; i < schedule.length; i++){
		var section = schedule[i].meeting_section;
		insertSection(section);
	}
}

$(document).ready(function() {
	renderCourses(courses);
});