/**
 * Get the course names from courses.json and populate the dropdown lists
 *
 * code modified from 
 * http://blog.teamtreehouse.com/creating-autocomplete-dropdowns-datalist-element
 */

// Get the <datalist> and <input> elements.
var dataList = document.getElementById('courseList');
var input = document.getElementById('dropdown');


// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();

// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) { //(status 200 indicates a successful request)
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);
      
      // Loop over the JSON array.
      jsonOptions.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item.code;

        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
      });

      // Update the placeholder text.
      input.placeholder = "enter course";
    } else {
      // An error occured :(
      input.placeholder = "Error loading options";
    }
  }
};

// Update the placeholder text.
input.placeholder = "Loading options...";

// Set up and make the request.
request.open('GET', '/js/courses.json', true);
request.send();