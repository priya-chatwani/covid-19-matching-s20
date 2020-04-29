console.log("Hello World! I'm printing from `assignment.js`");


/* * * * * * * * * * * * * * * * * * * * * * * *
                  COVID-19 MATCHING
* * * * * * * * * * * * * * * * * * * * * * * */

// Each address is like an (x,y) coordinate on a 10 x 10 grid
var addresses = {
  "Veronica": [4, 1],  "Graham": [3, 2],  "Jintana": [2, 4],  
  "Danielle": [7, 5],  "Anita": [5, 6],  "Clydean": [6, 4],  
  "Henry": [1, 2], "Abdollah": [8, 4]
}
var needsPetWalked = new Set("Abdollah", "Clydean")
var hasPet = new Set("Danielle", "Graham")
var needsVirtualHelp = new Set("Abdollah")
var needsGroceries = new Set("Henry", "Anita", "Clydean")

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
		console.log("list pre sorting", distanceFrom);
		var rankings = Object.keys(distanceFrom).map(function(key) {
			return [key, distanceFrom[key]];
		});
		// Sort the array based on the second element
		rankings.sort(function(a, b) { return a[1] - b[1]; });
		console.log("sorted", rankings);
		return rankings;
	}
	// Just needs virtual help? Return any ordering
	return volunteers;
}

function volPrefersNewReq(volunteer, matchReq, newMatchReq) {
	// If new match request needs their pet walked and this volunteer has a pet and currently 
	// has a match request without one, then this new match is preferred.
	if (newMatchReq in needsPetWalked && volunteer in hasPet && !(matchReq in needsPetWalked)) {
		return true;
	}
	return false;
}

function getRankings(volunteerArr, matchRequestArr) {
	volToMatchPreferences = {}
	for (var i = 0; i < volunteerArr.length; i++) {
		for (var j = 0; j < matchRequestArr.length; j++) {
			if (j === 0) {
				volToMatchPreferences[volunteerArr[i]] = {}
			}
			volToMatchPreferences[volunteerArr[i]][matchRequestArr[j]] = getDistance(matchRequestArr[j], volunteerArr[i])
		}
	}
	return volToMatchPreferences;
}

function getRankedVolunteer(match, volunteerArr) {
	var volunteerRankings = {}
	for (var i = 0; i < volunteerArr.length; i++) {
		volunteerRankings[volunteerArr[i]] = getDistance(match, volunteerArr[i]);
	}
	var rankings = Object.keys(volunteerRankings).map(function(key) {
		return [key, volunteerRankings[key]];
	});
	// var rankings = Object.keys(volunteerRankings)
	// Sort the array based on the second element
	rankings.sort(function(a, b) { return a[1] - b[1]; });
	return rankings;		
}

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
	// get the volunteers' preferences based on distance. these rankings are the same for match requests
	var volToMatchPreferences = getRankings(volunteerArr, matchRequestArr);

	// Create a counter to track how many matches have been made
	var numMatchesMade = 0
    // While there are unfulfilled match requests
    while (numMatchesMade < matchRequestArr.length) {
    	// pick the first unfulfilled match request
    	var currMatchReq;
    	console.log(currMatchReq, volToMatchReq, matchReqToVol)
    	for (var i = 0; i < matchRequestArr.length; i++) {
    		if (matchReqToVol[matchRequestArr[i]] === "free") {
    			currMatchReq = matchRequestArr[i]
    			break;
    		}
    	}
    	// Loop through all volunteers
    	var rankedVolunteers = getRankedVolunteer(currMatchReq, volunteerArr)
    	for (var i = 0; i < rankedVolunteers.length && matchReqToVol[currMatchReq] === "free"; i++) {
    		var currVolunteer = rankedVolunteers[i][0]
    		// Assign match request to volunteer if they are free
	    	if (volToMatchReq[currVolunteer] === "free") {
	    		volToMatchReq[currVolunteer] = currMatchReq
	    		matchReqToVol[currMatchReq] = currVolunteer
	    		console.log("inside if statement")
	    		numMatchesMade += 1
	    	} 
	    	// this choice isn't free? See who this volunteer is matched to
	    	else {
	    		var prevMatchReq = volToMatchReq[currVolunteer]
	    		// if the volunteer prefers this new match over their old one,
	    		// then redo the match
	    		if (volPrefersNewReq(currVolunteer, prevMatchReq, currMatchReq)) {
	    			volToMatchReq[currVolunteer] = currMatchReq
	    			matchReqToVol[currMatchReq] = currVolunteer
	    			matchReqToVol[prevMatchReq] = "free"
	    			console.log("inside else statement")
	    		}
	    	}
    	}
    }
    console.log("Mapping", volToMatchReq);
	return JSON.stringify(volToMatchReq)
}
