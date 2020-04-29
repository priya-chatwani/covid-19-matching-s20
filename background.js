/* * * * * * * * * * * * * * * * * * * * * * * *
                  COVID-19 MATCHING
* * * * * * * * * * * * * * * * * * * * * * * */

/* Handles submit buttons */
//Match
function submitMatches() {
  var volunteers = document.getElementById("volunteers").value
  var matchRequests = document.getElementById("match_requests").value
  if (volunteers.length == 0 || matchRequests.length == 0) {
    return
  }
  console.log(volunteers, matchRequests)
  var matches = createMatches(volunteers, matchRequests)
  if (matches.length == 0) {
  	return
  }
  var display_element = document.getElementById("match_keys")
  display_element.style = ""
  display_element.innerHTML = matches
  var display_element2 = document.getElementById("match_values")
  display_element2.style = ""
  //display_element2.innerHTML = matches.values()
}