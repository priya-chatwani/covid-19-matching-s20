/* * * * * * * * * * * * * * * * * * * * * * * *
                  COVID-19 MATCHING
* * * * * * * * * * * * * * * * * * * * * * * */

/* Handles Match submit button */
function submitMatches() {
  var volunteers = document.getElementById("volunteers").value
  var matchRequests = document.getElementById("match_requests").value
  if (volunteers.length == 0 || matchRequests.length == 0) {
    return
  }
  var matches = createMatches(volunteers, matchRequests)
  if (matches.length == 0) {
  	return
  }
  var display_element = document.getElementById("matches")
  display_element.style = ""
  display_element.innerHTML = matches
}