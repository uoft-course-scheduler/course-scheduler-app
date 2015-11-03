/**
 * Get the course names from courses.json and populate the dropdown lists
 *
 */

 function populateDatalist(input) {
    if (input.value.length >= 3) {
      //clear current list
      var dataList = document.getElementById('courseList');
      dataList.innerHTML = "";
      
      //create new list
      populate(input, dataList);
    }
 }


 function populate(input, dataList) {
    var query = input.value;

    /* 
     * the following code is modified from 
     * http://blog.teamtreehouse.com/creating-autocomplete-dropdowns-datalist-element
     */

    // Create a new XMLHttpRequest.
    var request = new XMLHttpRequest();

    // Handle state changes for the request.
    request.onreadystatechange = function(response) {
    if ((request.readyState === 4) && (request.status === 200)) {
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
    
      }
    };

    request.open('GET', '/uoft/filter/code:'+query, true);
    request.send();

 }
