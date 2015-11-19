/**
 * Populate the dropdown list based on user input
 *
 */

function populateDatalistFall(input) {
    if (input.value.length >= 3) {
      var dataList = document.getElementById('fallList');
      //clear current list
      dataList.innerHTML = "";
      
      //create new list
      populate(input, dataList, "Fall");
    }
 }
 
function populateDatalistWinter(input) {
    if (input.value.length >= 3) {
      var dataList = document.getElementById('winterList');
      //clear current list
      dataList.innerHTML = "";
      
      //create new list
      populate(input, dataList, "Winter");
    }
 }


function populate(input, dataList, term) {
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

        // Add option to datalist if it is in the correct term
        if ((item.term.search(term) != -1))
          dataList.appendChild(option);
        });
    
      }
    };

    request.open('GET', '/uoft/filter/code:'+query, true);
    request.send();

 }
