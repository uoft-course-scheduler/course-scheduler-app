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

function insertSection(section, course_code, classTimes) {
	var times = section.times;

	for (var j=0; j<times.length; j++) {
		var day = "." + times[j].day[0].toUpperCase() + times[j].day.substr(1).toLowerCase(),
			time = times[j].start,
			start = times[j].start,
			end = times[j].end,
			center = ((end - start  - 1) / 2) + start, // Subtracting 1 because it doesn't include the end hour
			even = ( (times[j].duration % 2) == 0);
			var isConflict = false;

		while (time != end) {
			var classTime = times[j].day.toUpperCase() + time;
			var hourRow = $("." + time);
			hourBlock = hourRow.children(day);
			if (classTimes.indexOf(classTime) > -1){
				isConflict = true;
			}
			else{
				classTimes.push(classTime);
			}
			if (isConflict){
				var colour = "#FF0000";
			}
			else{
				hourBlock[0].start = start;
				hourBlock[0].end = end;
				var colour = "#" + intToRGB(hashCode(course_code));
			}
			
			hourBlock.css("border", "none");
			hourBlock.css("background-color", colour);
			hourBlock.css("padding", "15px");
			time += 1;
		}

		if (even) {
			var firstHalf = Math.floor(center),
				secondHalf = Math.ceil(center),
				firstHalfBlock = $("." + firstHalf).children(day), // Doing same thing as hourBlock -> hourRow just all in 1 line
				secondHalfBlock = $("." + secondHalf).children(day);
				if (isConflict){
					var conflictStart = Math.min(start, firstHalfBlock[0].start);
					var conflictFirstHalf = "";
					for (var i = conflictStart; i < secondHalfBlock[0].end; i++){
						var tempBlock = $("." + i).children(day);
						conflictFirstHalf += tempBlock[0].innerHTML;
						tempBlock.css("background-color", "#FF0000");
					}
					firstHalfBlock = $("." + conflictStart).children(day)
					if (conflictStart == start){
						firstHalfBlock.html("CONFLICT<br>" + course_code + "<br>" + section.code + "<br>" + times[j].location + "<br>" + section.instructors + "<br>" + getTime(start) + ":00 - " + getTime(end) + ":00" + "<br><br>");
						secondHalfBlock.html(conflictFirstHalf);
					}
					else{
						firstHalfBlock.html("CONFLICT<br>" + conflictFirstHalf);
						secondHalfBlock.html(course_code + "<br>" + section.code + "<br>" + times[j].location + section.instructors + "<br>" + getTime(start) + ":00 - " + getTime(end) + ":00" + "<br><br>");
					}
					
				}
				else{
					firstHalfBlock.html(course_code + "<br>" + section.code + "<br>" + times[j].location);
					secondHalfBlock.html(section.instructors + "<br>" + getTime(start) + ":00 - " + getTime(end) + ":00");
				}
		} else {
			var centerBlock = $("." + center).children(day);
			if (isConflict){
				var oneHour = false;
				if (start == centerBlock[0].start && end == centerBlock[0].end && (end - start) == 1){
					oneHour = true;
				}
				var conflictStart = Math.min(start, centerBlock[0].start);
				var secondHalfBlock = $("." + (centerBlock[0].end - 1)).children(day);
				var conflictFirstHalf = "";
				for (var i = conflictStart; i < centerBlock[0].end; i++){
					var tempBlock = $("." + i).children(day);
					conflictFirstHalf += tempBlock[0].innerHTML + "<br>";
					tempBlock.css("background-color", "#FF0000");
				}
				firstHalfBlock = $("." + conflictStart).children(day)
				if (oneHour){
					firstHalfBlock.html("CONFLICT<br>" + course_code + "<br>" + section.code + "<br>" + times[j].location + "<br>" + section.instructors + "<br>" + getTime(start) + ":00 - " + getTime(end) + ":00" + "<br><br>" + conflictFirstHalf);
				}
				else if (conflictStart == start){
					firstHalfBlock.html("CONFLICT<br>" + course_code + "<br>" + section.code + "<br>" + times[j].location + "<br>" + section.instructors + "<br>" + getTime(start) + ":00 - " + getTime(end) + ":00");

				}
				else{
					firstHalfBlock.html("CONFLICT<br>" + conflictFirstHalf);
					secondHalfBlock.html(course_code + "<br>" + section.code + "<br>" + times[j].location + "<br>" + section.instructors + "<br>" + getTime(start) + ":00 - " + getTime(end) + ":00");
				}
			} else{
				centerBlock.html(course_code + "<br>" + section.code + "<br>" + times[j].location + "<br>" + section.instructors + "<br>" + getTime(start) + ":00 - " + getTime(end) + ":00");		
			}
		}
	}
}

function getTime(time){
	var retTime = time % 12;
	if (retTime == 0){
		retTime = 12;
	}
	return retTime;
}

function renderCourses(json, index){
	clearTimeTable();
	var i = index - 1 || 0;
	var schedule = json[i];
	var numPermutations = json.length;
	$('#total').html(numPermutations);
	$('#index').html(index);
	var classTimes = [];
	//var index = $('#index').html();
	for (var i = 0; i < schedule.length; i++){
		
		var section = schedule[i].meeting_section;
		var course_code = schedule[i].course_code;
		insertSection(section, course_code, classTimes);
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

var DATA;
$(document).ready(function() {

	var courseCodes, json = [];
	$('#generateSchedule').on('click', function() {
		query = getCourseCodesQuery();

		$.ajax({
			url: '/uoft/course/generate?courses=' + query,
			dataType: 'json',
			success: function(data) {
				DATA = data;
				console.log(DATA.length);
				renderCourses(data, 1);
			},
			error: function(jqXHR, textError) {
				console.log(textError);
				console.log(jqXHR);
			}
		});
	});

	$('#prevPermutation').on('click', function() {
		var index = parseInt($('#index').html());
		if (index > 1) {
			var newIndex = index - 1;
			$('#index').html(newIndex);
			renderCourses(DATA, newIndex)
		}
	});

	$('#nextPermutation').on('click', function() {
		var index = parseInt($('#index').html());
		var total = parseInt($('#total').html());
		if (index < total) {
			var newIndex = index + 1;
			$('#index').html(newIndex);
			renderCourses(DATA, newIndex);
		}
	});
});