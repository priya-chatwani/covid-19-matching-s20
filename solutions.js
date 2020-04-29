console.log("Hello World! I'm printing from `assignment.js`");


/* * * * * * * * * * * * * * * * * * * * * * * *
                  COVID-19 MATCHING
* * * * * * * * * * * * * * * * * * * * * * * */

// Each number represents an address such that addresses 
// close in number are geographically closer together
var personToAddress = {
  "Veronica": 7,  "Graham": 6,  "Jintana": 3,  
  "Danielle": 8,  "Guillermo": 11, "Hunter": 1,  
  "Anita": 9,  "Clydean": 10,  "Henry": 2,  
  "Abdollah": 12, "Sima": 5, "Lupe": 4
}

var havePets = new Set("Abdollah", "Clydean", "Danielle")
var needsVirtualHelp = new Set("Sima", "Abdollah")
var needsGroceries = new Set("Lupe", "Henry", "Anita", "Clydean")
// inverse of the addresses mapping
var addressToPerson = Object.keys(personToAddress);

/*
 * Returns the "distance" between two people
 * ----
 * Params:
 * > volunteer - name of volunteer
 * > matchRequest - name of match request
 *
 * Returns:
 * > int - abstracted geographical distance
 */

function getDistance(matchRequest, volunteer) {
  return abs(personToAddress[volunteer] - personToAddress[matchRequest])
}

/*
 * This function returns true if the volunteer prefers
 * the given match request over their current match request 
 * ----
 * Params:
 * > volunteer - name of volunteer
 * > matchRequest - name of match request
 *
 * Returns:
 * > int - abstracted geographical distance
 */
function isValid(arr) {
	if (arr.length == 0) {
		return false
	}
	for (var i = 0; i < arr.length; i++) {
		// Check if the person's address exists in our map. If not, return false.
		if (arr[i] in personToAddress === false) {
			return false
		}
	}
	return true
}

function inputToArr(input) {
	// Remove spaces from the input
	var list = input.split(" ").join(""); 
	// Create an array 
	var arr = list.split(',');
	return arr;
}

function getPreferences(matchReq, volunteers) {
	// Needs grocery help? Rank based on location
	if (matchReq in needsGroceries) {
		var distanceFrom = {}
		for (var i = 0; i < volunteers.length; i++) {
			distanceFrom[volunteers[i]] = getDistance(matchReq, volunteers[i])
		}
		var rankings = Object.keys(distanceFrom).map(function(key) {
			return [key, distanceFrom[key]];
		});
		// Sort the array based on the second element
		rankings.sort(function(a, b) { return a[1] - b[1]; });
		return rankings;
	}
	// Just needs virtual help? Return any ordering
	return volunteers;
}

function volPrefersCurrReq(volunteer, matchReq, newMatchReq) {
	// If new match request needs groceries and lives closer, then new match is preferred.
	// Extension: include pet walking.
	if (newMatchReq in needsGroceries && (
		getDistance(volunteer, newMatchReq) <= getDistance(volunteer, matchReq))) {
		return true;
	}
	return false;
}

function createMatches(volunteerInput, matchRequestInput) {
	var volunteerArr = inputToArr(volunteerInput);
	var matchRequestArr = inputToArr(matchRequestInput);
	// Check that the input are valid and match in length
	if (!isValid(volunteerArr) || !isValid(matchRequestArr) || volunteerArr.length !== matchRequestArr.length) {
		return
	}
	// First, initialize all volunteers and match requests to be free
	// Hint: can you use an array dictionary to track this? Mark a volunteer as "free" or use a boolean?
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
    		if (matchReqToVol[matchRequestArr[i]] == "free") {
    			currMatchReq = matchRequestArr[i]
    			break;
    		}
    	}
    	// Get the rankings / preferences for this match request
    	var rankings = getPreferences(currMatchReq, volunteerArr);
    	// first choice is free? make it happen!
    	var prefVolunteer = rankings[0];
    	if (volToMatchReq[prefVolunteer] == "free") {
    		volToMatchReq[prefVolunteer] = currMatchReq
    		matchReqToVol[currMatchReq] = prefVolunteer
    		numMatchesMade += 1
    	} 
    	// first choice isn't free? See who the first choice volunteer is matched to
    	else {
    		var prevMatchReq = volToMatchReq[prefVolunteer]
    		// if the volunteer prefers this new match over their old one,
    		// then redo the match
    		if (volPrefersCurrReq(prefVolunteer, prevMatchReq, currMatchReq) === false) {
    			volToMatchReq[prefVolunteer] = currMatchReq
    			matchReqToVol[currMatchReq] = prefVolunteer
    			matchReqToVol[prevMatchReq] = "free"
    		}
    	}
    }
    // console.log("Mapping", volToMatchReq.toString());
    // return volToMatchReq.toString();
    return JSON.stringify(volToMatchReq)
}
