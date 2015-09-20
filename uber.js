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

            