course = {
	"_id" : "562dd38ba6b3f172bd92580e",
	"id" : "COPD02H3Y20159",
	"code" : "COPD02H3Y",
	"name" : "Co-op IDS Work Prep ",
	"description" : "",
	"division" : "University of Toronto Scarborough",
	"department" : "Centre for Critical Development Studies (UTSC)",
	"prerequisites" : "",
	"exclusions" : "",
	"level" : 400,"campus":"UTSC",
	"term": "2015 Fall",
	"meeting_sections" :
		[{
			"code" : "T0001",
			"size" : 60,
			"enrolment" : 0,
			"times" : 
				[{
					"day" : "FRIDAY",
					"start" : 13,
					"end" : 15,
					"duration" : 2,
					"location" : "MW 140"
				}],
			"instructors":["K Boomgaardt"]
		}],
	"breadths" : []
}

function renderCourse(json, code) {
	var sections = json.meeting_sections,
		secion;
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
			hourBlock.html("hello");
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

$(document).ready(function() {
	renderCourse(course, "T0001");
});