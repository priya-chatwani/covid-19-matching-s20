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
  // TODO: return Euclidian distance between points a and b
}

/*
 * This function sorts a dictionary by its value by converting it to an array of tuples. 
 * In JS, dictionaries cannot be sorted.
 * ----
 * Params:
 * > dict - dictionary of key, value pairs
 *
 * Returns:
 * > arr - An array of tuples [key, value] in ascending order of value
 */
function sortDictByValue(dict) {
	// Turn the dictionary into an array of tuples [key, value] so that it can be sorted
	var arr = Object.keys(dict).map(function(key) {
		return [key, dict[key]];
	});
	// Sort the array based on the second element (dict value)
	arr.sort(function compare(a, b) {
	  return a[1] - b[1]
	})	
	return arr;
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
	// TODO: create a dictionary to save the distance between matchReq and each volunteer 
	// Return sortRankedVolunteers(your_dict)
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
	// TODO: return True or False here. Return True if the volunteer has a pet and the new match request 
	// needs their pet walked (and the current match request doesn't).
}

/*
 * This function outputs the matches that have been created by the Stable Marriage Algorithm.
 * ----
 * Params:
 * > volunteerInput - string of comma-separated volunteer names
 * > matchRequestInput - string of comma-separated match request names
 *
 * Returns:
 * > A dictionary as follows: dict[volunteer name] = paired match request. 
 * Use JSON.stringify(dict) to render the dict object in the HTML file
 */
function createMatches(volunteerInput, matchRequestInput) {
	var volunteerArr = inputToArr(volunteerInput);
	var matchRequestArr = inputToArr(matchRequestInput);
	// Check that the input are valid and match in length
	if (!isValid(volunteerArr) || !isValid(matchRequestArr) || volunteerArr.length !== matchRequestArr.length) {
		return "Invalid inputs"
	}
	
	// TODO: Initialize all volunteers and match requests to be free
	// Hint: can you use an array or dictionary to track this? Mark a volunteer as "free" or use a boolean?
	
	var numMatchesMade = 0 // Counter to track how many matches have been made
    // While there are unfulfilled match requests
    while (numMatchesMade < matchRequestArr.length) {
    	numMatchesMade += 1 // delete this line when you add your implementation
    	// TODO: Pick the first unfulfilled match request
    	
    	// TODO: Loop through all volunteers in order of the current match request's rankings to find a match. 
    	// If the volunteer is free, assign the match request to them
    	// If the volunteer is not free, see who they are currently matched to and determine if they should switch
    	// Hint: In your for loop, include the condition that the current match request remains free
    	// Hint: Remember that rankedVolunteers is an array of tuples
    	
    }
    // TODO: Return your final mapping. If the final mapping is a dictionary, return JSON.stringify(dict) 
    // to render the dict object in the HTML file
    return ""
}