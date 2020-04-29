console.log("Hello World! I'm printing from `assignment.js`");


/* * * * * * * * * * * * * * * * * * * * * * * *
                  COVID-19 MATCHING
* * * * * * * * * * * * * * * * * * * * * * * */

// Each address is like an (x,y) coordinate on a 10 x 10 grid
var addresses = {
  "Veronica": [4, 1],  "Graham": [3, 2],  "Jintana": [2, 4],  
  "Guillermo": [9, 5], "Hunter": [1, 7], "Danielle": [7, 5],  
  "Anita": [5, 6],  "Clydean": [6, 4],  "Henry": [1, 2], 
  "Abdollah": [8, 4], "Sima": [9, 2], "Lupe": [5, 3]
}
var needsPetWalked = new Set("Abdollah", "Clydean", "Anita")
var hasPet = new Set("Danielle", "Graham", "Guillermo")
var needsVirtualHelp = new Set("Abdollah")
var needsGroceries = new Set("Henry", "Anita", "Clydean", "Sima", "Abdollah")

/*
 * This function returns true if the given array has valid entries 
 * ----
 * Params:
 * > arr - array of volunteer or match request names
 *
 * Returns:
 * > boolean - if valid
 */
function isValid(arr) {
	if (arr.length === 0) {
		return false
	}
	for (var i = 0; i < arr.length; i++) {
		// Check if the person's address exists in our map. If not, return false.
		if (arr[i] in addresses === false) {
			return false
		}
	}
	return true
}

/*
 * This function modifies a string with comma separated text into an array
 * ----
 * Params:
 * > input - string with comma separated names of volunteers or match requests
 *
 * Returns:
 * > arr - array representation
 */
function inputToArr(input) {
	// Remove spaces from the input
	var list = input.split(" ").join(""); 
	// Create an array 
	var arr = list.split(',');
	return arr;
}

/*
 * Returns the "distance" between two people
 * ----
 * Params:
 * > a - person 1
 * > b - person 2
 *
 * Returns:
 * > int - abstracted geographical distance
 */
function getDistance(a, b) {
  return ((addresses[a][0] - addresses[b][0]) ** 2) + ((addresses[a][1] - addresses[b][1]) ** 2)
}

/*
 * This function determines whether the volunteer prefers a new match request over their current one.
 * For this implementation, pet walking is used as a criteria for switching. 
 * The volunteer will switch if they have a pet and this new match request needs their pet walked.
 * ----
 * Params:
 * > volunteer - name of volunteer for whom we are optimizing their match
 * > matchReq - name of volunteer's current match request
 * > newMatchReq - name of a different match request to whom volunteer is comparing their current match request
 *
 * Returns:
 * > boolean - True if volunteer wants to change their request, False if volunteer wants to keep match as is
 */
function volPrefersNewReq(volunteer, matchReq, newMatchReq) {
	// If new match request needs their pet walked and this volunteer has a pet and currently 
	// has a match request without one, then this new match is preferred.
	if (newMatchReq in needsPetWalked && volunteer in hasPet && !(matchReq in needsPetWalked)) {
		return true;
	}
	return false;
}

/*
 * This function outputs the given match request's volunteer preferences based on distance.
 * ----
 * Params:
 * > matchReq - name of match request whose rankings will be returned
 * > volunteerArr - array of volunteers who can be matched
 *
 * Returns:
 * > rankings - An array of tuples [volunteer name, distance] sorted in ascending distance
 */
function getRankedVolunteers(matchReq, volunteerArr) {
	// Dictionary where volunteerRankings[volunteer] = distance between matchReq and volunteer
	var volunteerRankings = {}
	for (var i = 0; i < volunteerArr.length; i++) {
		volunteerRankings[volunteerArr[i]] = getDistance(matchReq, volunteerArr[i]);
	}
	// Dictionaries cannot be sorted in JS.
	// Turn the dictionary into an array of tuples [volunteer name, distance] so that it can be sorted
	var rankings = Object.keys(volunteerRankings).map(function(key) {
		return [key, volunteerRankings[key]];
	});
	// Sort the array based on the second element (distance)
	rankings.sort(function compare(a, b) {
	  return a[1] - b[1]
	})	
	// Returns a list of tuples [volunteer name, distance] in ascending distance
	return rankings;		
}

/*
 * This function outputs the matches that have been created by the Stable Marriage Algorithm.
 * ----
 * Params:
 * > volunteerInput - string of comma-separated volunteer names
 * > matchRequestInput - string of comma-separated match request names
 *
 * Returns:
 * > JSON.stringify(volToMatchReq) - A dictionary with volunteer names as keys and the corresponding 
 * match request names as values. The dictionary goes through JSON.stringify so that it can be 
 * rendered in the HTML file
 */
function createMatches(volunteerInput, matchRequestInput) {
	var volunteerArr = inputToArr(volunteerInput);
	var matchRequestArr = inputToArr(matchRequestInput);
	// Check that the input are valid and match in length
	if (!isValid(volunteerArr) || !isValid(matchRequestArr) || volunteerArr.length !== matchRequestArr.length) {
		return "Invalid inputs"
	}
	// First, initialize all volunteers and match requests to be free
	// Hint: can you use an array or dictionary to track this? Mark a volunteer as "free" or use a boolean?
	var volToMatchReq = {}
	var matchReqToVol = {}
	for (var i = 0; i < volunteerArr.length; i++) {
		volToMatchReq[volunteerArr[i]] = "free";
		matchReqToVol[matchRequestArr[i]] = "free";
	}
	
	// Create a counter to track how many matches have been made
	var numMatchesMade = 0
    // While there are unfulfilled match requests
    while (numMatchesMade < matchRequestArr.length) {
    	// pick the first unfulfilled match request
    	var currMatchReq;
    	for (var i = 0; i < matchRequestArr.length; i++) {
    		if (matchReqToVol[matchRequestArr[i]] === "free") {
    			currMatchReq = matchRequestArr[i]
    			break;
    		}
    	}
    	// Loop through all volunteers. Remember that rankedVolunteers is an array of tuples
    	var rankedVolunteers = getRankedVolunteers(currMatchReq, volunteerArr)
    	for (var i = 0; i < rankedVolunteers.length && matchReqToVol[currMatchReq] === "free"; i++) {
    		var currVolunteer = rankedVolunteers[i][0]
    		// If this volunteer is free, assign the match request to them
	    	if (volToMatchReq[currVolunteer] === "free") {
	    		volToMatchReq[currVolunteer] = currMatchReq
	    		matchReqToVol[currMatchReq] = currVolunteer
	    		numMatchesMade += 1
	    	} 
	    	// If this choice is not, see who the volunteer is matched to. Check if they want to switch.
	    	else {
	    		var prevMatchReq = volToMatchReq[currVolunteer]
	    		// If the volunteer prefers this new match over their old one, then redo the match
	    		if (volPrefersNewReq(currVolunteer, prevMatchReq, currMatchReq)) {
	    			volToMatchReq[currVolunteer] = currMatchReq
	    			matchReqToVol[currMatchReq] = currVolunteer
	    			matchReqToVol[prevMatchReq] = "free"
	    		}
	    	}
    	}
    }
	return JSON.stringify(volToMatchReq)
}