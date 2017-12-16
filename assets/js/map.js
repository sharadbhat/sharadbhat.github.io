function myMapp() {
	var myCenter = new google.maps.LatLng(12.8614515, 77.66470809999998);
    var mapOptions = {
        center: myCenter,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.MAP
    }
var marker = new google.maps.Marker({position: myCenter});
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
marker.setMap(map);
}
