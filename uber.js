var URL = "https://api.uber.com/v1/products"
var serverTok = "ooz5hyCMQ1Ib8Q306BMgLe6KWyEjDmRNjSb9OCGk"
var latitude, longitude;
var uberBaseRate, uberPerDistance;
var endMiles = 23.24;
var latForUber = 42.358466;
var longForUber = -71.096059;
var locationData;

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
    uberPerDistance = html.products[0].price_details.cost_per_distance;
  },
  error: function (response) {
  	//console.log('fail');
  	console.log(response);
  },
  type: 'GET',
  // dataType : 'jsonp'
});


setTimeout(function (){
  console.log(uberBaseRate);
  console.log(uberPerDistance);

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

$.getScript("http://oauth.googlecode.com/svn/code/javascript/oauth.js", function(){
  $.getScript("http://oauth.googlecode.com/svn/code/javascript/sha1.js", function(){
    var auth = {
        //
        // Update with your auth tokens.
        //
        consumerKey : "cHdx9xfLppl61fZRTN8d2g",
        consumerSecret : "7r2bfe_VvoK28JUVvdjC6zKrtZg",
        accessToken : "4qHWBOuy_XOpSzljW9FwPVFB1DymesjO",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret : "FfY4kSO9bKeqfD53L0QBNy5m4S8",
        serviceProvider : {
            signatureMethod : "HMAC-SHA1"
        }
    };

    var near = 'San+Francisco';

    var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
    };
    parameters = [];
    parameters.push(['location', near]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    //console.log(parameterMap);

    $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'success' : function(data, textStats, XMLHttpRequest) {
            //$(#yelpInfo).val(data);
            //$("body").append(output);
            console.log(data);
            locationData = data;
        }
    });
  });

});
            