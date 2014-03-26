
/* stations.js - render MBTA stations lines using Google Maps API */

var request = new XMLHttpRequest(),
    train_data,
    lat = 42.373076999999995,
    lng = -71.1027502,
    me = new google.maps.LatLng(lat, lng),
    options,
    map;

    function init() {
    request.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
    request.onreadystatechange = callback;
    request.send(null);
}

function callback() {
    if (request.readyState == 4 && request.status == 200) {
        train_data = JSON.parse(request.responseText);
        getMyLocation();
        renderMap();
        console.log(train_data.line);
    } else if (request.status == 500) {
        document.getElementById("trains").innerHTML = 'Fail...';
    }
}

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
		lng = position.coords.longitude;
		});
	} else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap() {
    options = { zoom : 13,
                center : me,
                mapTypeId : google.maps.MapTypeId.ROADMAP
              };
    map = new google.maps.Map(document.getElementById("trains"), options);

    // Update map and go there...
    map.panTo(me);

    // Create a marker
    marker = new google.maps.Marker({
        position: me,
        title: "Here I Am!"
    });
    marker.setMap(map);

    /* // Open info window on click of marker
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
    });

    // Calling Google Places API
    var request = {
        location: me,
        radius: '500',
        types: ['food']
    };
    service = new google.maps.places.PlacesService(map);
    service.search(request, callback); */
}
