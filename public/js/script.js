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
	var course_code = json.course_code;
	for (var i=0; i<sections.length; i++) {
		if (sections[i].code == code) {
			section = sections[i];
			break;
		}
	}

	if (sections) {
		insertSection(section, course_code);
	}
}

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function insertSection(section, course_code) {
	var times = section.times;

	for (var j=0; j<times.length; j++) {
		var day = "." + times[j].day[0].toUpperCase() + times[j].day.substr(1).toLowerCase(),
			time = times[j].start,
			start = times[j].start,
			end = times[j].end,
			center = ((end - start  - 1) / 2) + start, // Subtracting 1 because it doesn't include the end hour
			even = ( (times[j].duration % 2) == 0);

		while (time != end) {
			var colour = intToRGB(hashCode(course_code));
			console.log(colour);
			var hourRow = $("." + time);
			hourBlock = hourRow.children(day);
			hourBlock.css("border", "none");
			hourBlock.css("background-color", "#" + colour);
			hourBlock.css("padding", "15px");
			time += 1;
		}

		if (even) {
			var firstHalf = Math.floor(center),
				secondHalf = Math.ceil(center),
				firstHalfBlock = $("." + firstHalf).children(day), // Doing same thing as hourBlock -> hourRow just all in 1 line
				secondHalfBlock = $("." + secondHalf).children(day);
				firstHalfBlock.html(course_code + "<br>" + section.code + "<br>" + times[j].location);
				secondHalfBlock.html(section.instructors);
		} else {
			centerBlock = $("." + center).children(day);
			centerBlock.html(course_code + "<br>" + section.code + "<br>" + times[j].location + "<br>" + section.instructors);
		}
	}
}

function renderCourses(json){
	clearTimeTable();
	var schedule = json[0];
	var numPermutations = schedule.length;
	$('#total').html(numPermutations);
	for (var i = 0; i < schedule.length; i++){
		var section = schedule[i].meeting_section;
		var course_code = schedule[i].course_code;
		insertSection(section, course_code);
	}
}

// SNIPPET FROM https://css-tricks.com/snippets/javascript/remove-inline-styles/
function remove_style(all) {
  var i = all.length;
  var j, is_hidden;

  // Presentational attributes.
  var attr = [
    'align',
    'background',
    'bgcolor',
    'border',
    'cellpadding',
    'cellspacing',
    'color',
    'face',
    'height',
    'hspace',
    'marginheight',
    'marginwidth',
    'noshade',
    'nowrap',
    'valign',
    'vspace',
    'width',
    'vlink',
    'alink',
    'text',
    'link',
    'frame',
    'frameborder',
    'clear',
    'scrolling',
    'style'
  ];

  var attr_len = attr.length;

  while (i--) {
    is_hidden = (all[i].style.display === 'none');

    j = attr_len;

    while (j--) {
      all[i].removeAttribute(attr[j]);
    }

    // Re-hide display:none elements,
    // so they can be toggled via JS.
    if (is_hidden) {
      all[i].style.display = 'none';
      is_hidden = false;
    }
  }
}

function clearTimeTable() {
	blocks = $('#Schedule').find('td');
	remove_style(blocks);
	blocks.each(function(index, element) {
		blocks.eq(index).html('');
	});
}

function getCourseCodesQuery() {
	query = '';
	$('.courses').each(function(index, element) {
		value = $('.courses').eq(index).val();
		if (value != '') { // Check if input field actually has a course selected
			query += value + ",";
		} else {
			// If handling needed for no input
			// Possible counter/incremenation to check if ANY courses were selected at all
		}
	});

	return query.substring(0, query.length-1);
}

$(document).ready(function() {
	renderCourses(courses);

	var courseCodes, json = [];
	$('#generateSchedule').on('click', function() {
		query = getCourseCodesQuery();
		console.log(query);

		$.ajax({
			url: '/uoft/course/generate?courses=' + query,
			dataType: 'json',
			success: function(data) {
				renderCourses(data);
			},
			error: function(jqXHR, textError) {
				console.log(textError);
				console.log(jqXHR);
			}
		});
	});
});