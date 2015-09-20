var URL = "https://api.uber.com/v1/products"
var serverTok = "ooz5hyCMQ1Ib8Q306BMgLe6KWyEjDmRNjSb9OCGk"
var latitude, longitude;
var uberBaseRate, uberPerDistance, uberPerTime;
var endMiles = 23.24;
var latForUber = 42.358466;
var longForUber = -71.096059;
var locationData;

var url = window.location
var query = window.location.search.substring(1)
var string = JSON.stringify(query)
var stringArray = string.split("=")
var budget = parseInt(stringArray[1])


$.ajax({
  url: URL,
  headers: {
    Authorization: "Token " + serverTok
  },
  data: {
    latitude : latForUber,
    longitude : longForUber,
	},
  success: function(html){
  	//console.log('success');
    uberBaseRate = html.products[0].price_details.base;
    uberPerDistance = html.products[0].price_details.cost_per_minute;
  },
  error: function (response) {
  	//console.log('fail');
  	console.log(response);
  },
  type: 'GET',
  // dataType : 'jsonp'
});


setTimeout(function (){
  //console.log(uberBaseRate);
  //console.log(uberPerDistance);




$.getScript("http://oauth.googlecode.com/svn/code/javascript/oauth.js", function(){
  $.getScript("http://oauth.googlecode.com/svn/code/javascript/sha1.js", function(){
        var priceAsked = budget;
        //var startingLoc = "get starting loc from user using javascript when user clicks submit";
        console.log(priceAsked)

        //data from uber
        var uberCityData = "insert uber api call to get city info below";
        var uberCity = { //based on the city of boston, should be taking data from uber api
            "baseFare":2,
            "perMin":uberPerTime,
            "perMile":uberPerDistance,
            "minFare":5,
            "safeRides":1
        };
        //for calculating the miles of possible travel
        var maxRideTime = 40; //(in minutes, could be randomized or input by user)
        var milesPossible = (priceAsked - uberCity.baseFare - maxRideTime*uberCity.perMin - uberCity.safeRides) / uberCity.perMile; 


        var auth = {
            //
            // Update with your auth tokens.
            //
            consumerKey : "d_TgfQDhHorz-VHX8omVHQ",
            consumerSecret : "T58G5KZiBwtgvLg6X0f6l_QkEZM",
            accessToken : "HvVrxH4oyuj5gbDbs98Fnifd-bthyowe",
            // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
            // You wouldn't actually want to expose your access token secret like this in a real application.
            accessTokenSecret : "jv1EFGuLQd9kvIBnUoFChpDqLCs",
            serviceProvider : {
                signatureMethod : "HMAC-SHA1"
            }
        };

        var near = 'Boston';

        var accessor = {
            consumerKey : auth.consumerKey,
            accessToken : auth.accessToken,
            consumerSecret : auth.consumerSecret,
            tokenSecret : auth.accessTokenSecret
        };
        parameters = [];
        parameters.push(['location', near]);
        parameters.push(['callback', 'cb']);
        parameters.push(['radius_filter', 10]);
        parameters.push(['oauth_consumer_key', auth.consumerKey]);
        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters.push(['oauth_token', auth.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
        parameters.push(['format', 'json']);

        var message = {
            'action' : 'http://api.yelp.com/v2/search',
            'method' : 'GET',
            'parameters' : parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.completeRequest(message, accessor);        
        OAuth.SignatureMethod.sign(message, accessor);

        var parameterMap = OAuth.getParameterMap(message.parameters);
        console.log(parameterMap);

        var locationData;
        $.ajax({
            'url' : message.action,
            'data' : parameterMap,
            'dataType' : 'jsonp',
            'jsonpCallback' : 'cb',
            'success' : function(data, textStats, XMLHttpRequest) {
                //$(#yelpInfo).val(data);
                //$("body").append(output);
                //console.log(data);
                locationData = data;

                callback();
            },
            'error': function(response){
              alert(response);
            }

        });

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

        function callback(){
            //console.log(locationData);
            //for calculating the random location
            //var locations = "insert yelp/googlemaps api call to get locations within miles possible"; //(json object) 
            var randomLoc = locationData.businesses[Math.floor((Math.random() * locationData.businesses.length) + 1)].id; //calculate the random location using hardcoded info for now (get name for now)
            console.log(randomLoc)
        }
        
        

        //document.getElementById("randomLoc").innerHTML = hardCodeLocations.names;
        //console.log(locationData);

        //variables used to display info to user
        var distanceBetweenLocs = "insert google maps api call here using startingLoc and randomLoc"; //in miles
        var timeBetweenLocs = "insert google maps api call here using startingLoc and randomLoc"; //in minutes
})
})
}, 500); // delay 500 milliseconds to stall and wait for the uber api call to come back 

// window.onload = function() {
//     if (navigator.geolocation) {
//         //navigator.geolocation.getCurrentPosition(show_map, handle_error);
//     } else {
//         error('not supported');
//     }
//     function show_map(position) {
//         latitude = position.coords.latitude;
//         longitude = position.coords.longitude;
//         // $('#startID').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?zoom=15&format=png&sensor=false&size=280x280&maptype=roadmap&style=element:geometry.fill|color:0xf4f4f4&markers=color:red|42.358466, -71.096059&scale=1')
//     }
//     function handle_error(err) {
//         alert(err.code);
//         if (err.code == 1) {
//             // user said no!
//         }
//     }
// }

            