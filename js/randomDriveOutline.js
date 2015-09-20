var hardCodeLocations = {
	"names":
		"Fenway"
	,
	"address":
		{"Fenway":"4 Yawkey Way, Boston, MA 02215"}
	,
	//coordinates (lat and long calculated after selected?)
	"coords":
		{"Fenway":""}
	
};

//input from user
var priceAsked = "get price asked from user using javascript when user clicks submit";
var startingLoc = "get starting loc from user using javascript when user clicks submit";

//data from uber
var uberCityData = "insert uber api call to get city info below";
var uberCity = { //based on the city of boston, should be taking data from uber api
	"baseFare":2,
	"perMin":.16,
	"perMile":1.24,
	"minFare":5,
	"safeRides":1
};
//for calculating the miles of possible travel
var maxRideTime = 40; //(in minutes, could be randomized or input by user)
var milesPossible = (priceAsked - uberCity.baseFare - maxRideTime*uberCity.perMin - uberCity.safeRides) / uberCity.perMile; 

//for calculating the random location
var locations = "insert yelp/googlemaps api call to get locations within miles possible"; //(json object) 
var randomLoc = hardCodeLocations.names[Math.floor((Math.random() * locations.length) + 1)]; //calculate the random location using hardcoded info for now (get name for now)

document.getElementById("randomLoc").innerHTML = hardCodeLocations.names;

//variables used to display info to user
var distanceBetweenLocs = "insert google maps api call here using startingLoc and randomLoc"; //in miles
var timeBetweenLocs = "insert google maps api call here using startingLoc and randomLoc"; //in minutes
