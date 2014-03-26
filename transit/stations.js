
/* stations.js - render MBTA stations lines using Google Maps API */

var request = new XMLHttpRequest(),
    train_data,
    lat = 42.373076999999995,
    lng = -71.1027502,
    me = new google.maps.LatLng(lat, lng),
    options,
    map,
    blue, orange, red;

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
    var infoWindow,
        marker; 

    options = { zoom : 13,
                center : me,
                mapTypeId : google.maps.MapTypeId.ROADMAP
              };
    map = new google.maps.Map(document.getElementById("trains"), options);

    /* Update map and go there... */
    map.panTo(me);

    marker = new google.maps.Marker({
        position: me,
        map : map, 
        title: "Here I am at: "
    });

    /* Set info window contents and open */
    infoWindow = new google.maps.InfoWindow({ 'maxWidth' : '100px' });
    infoWindow.setContent(marker.title + marker.position);
    infoWindow.open(map, marker);

    setStationMarkers();
}

function setStationMarkers () {
    var line,
        marker_color,
        line_color,
        path = [];

    if (train_data.line == 'red') {
        line = red;
        line_color = 'red';
        marker_color = 'http://google.com/mapfiles/ms/micons/red-dot.png';
    } else if (train_data.line == 'orange') {
        line = orange;
        line_color = 'orange';
        marker_color = 'http://google.com/mapfiles/ms/micons/orange-dot.png';
    } else if (train_data.line == 'blue') {
        line = blue;
        line_color = 'blue';
        marker_color = 'http://google.com/mapfiles/ms/micons/blue-dot.png';
    }
    /* sort line from north to south */
    line.sort(function (a, b) { return (a.Lat > b.Lat) ? 1 : (a.Lat < b.Lat) ? -1 : 0; });
    
    /* add the markers */
    line.map(function (stop) {
        var stopLocation = new google.maps.LatLng(stop.Lat, stop.Long),
            infoWindow = new google.maps.InfoWindow({ 'maxWidth' : '100px' }),
            marker = new google.maps.Marker({
                position : stopLocation,
                title : stop.Name,
                map : map,
                icon : marker_color
            });

        /* add stop location to path for polyline drawing */
        path.push(stopLocation);

        /* display station name in info window */
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);
		});
    });

    /* add the polyline path connecting the stops */
    path = new google.maps.Polyline({ path : path,
                                      strokeColor : line_color,
                                      map : map });
}

/* hardcoded station location data */

blue = [
    { "Name":"Airport", "Lat":42.374262, "Long":-71.030395 },
    { "Name":"Aquarium", "Lat":42.359784, "Long":-71.051652 },
    { "Name":"Beachmont", "Lat":42.39754234, "Long":-70.99231944 },
    { "Name":"Bowdoin", "Lat":42.361365, "Long":-71.062037 },
    { "Name":"Government Center", "Lat":42.359705, "Long":-71.05921499999999 },
    { "Name":"Maverick", "Lat":42.36911856, "Long":-71.03952958000001 },
    { "Name":"Orient Heights", "Lat":42.386867, "Long":-71.00473599999999 },
    { "Name":"Revere Beach", "Lat":42.40784254, "Long":-70.99253321 },
    { "Name":"State Street", "Lat":42.358978, "Long":-71.057598 },
    { "Name":"Suffolk Downs", "Lat":42.39050067, "Long":-70.99712259 },
    { "Name":"Wonderland", "Lat":42.41342, "Long":-70.991648 },
    { "Name":"Wood Island", "Lat":42.3796403, "Long":-71.02286539000001 }];
orange = [
    { "Name":"Back Bay", "Lat":42.34735, "Long":-71.075727 },
    { "Name":"Chinatown", "Lat":42.352547, "Long":-71.062752 },
    { "Name":"Community College", "Lat":42.373622, "Long":-71.06953300000001 },
    { "Name":"Downtown Crossing", "Lat":42.355518, "Long":-71.060225 },
    { "Name":"Forest Hills", "Lat":42.300523, "Long":-71.113686 },
    { "Name":"Green Street", "Lat":42.310525, "Long":-71.10741400000001 },
    { "Name":"Haymarket", "Lat":42.363021, "Long":-71.05829 },
    { "Name":"Jackson Square", "Lat":42.323132, "Long":-71.099592 },
    { "Name":"Malden Center", "Lat":42.426632, "Long":-71.07411 },
    { "Name":"Mass Ave", "Lat":42.341512, "Long":-71.083423 },
    { "Name":"North Station", "Lat":42.365577, "Long":-71.06129 },
    { "Name":"Oak Grove", "Lat":42.43668, "Long":-71.07109699999999 },
    { "Name":"Roxbury Crossing", "Lat":42.331397, "Long":-71.095451 },
    { "Name":"Ruggles", "Lat":42.336377, "Long":-71.088961 },
    { "Name":"State Street", "Lat":42.358978, "Long":-71.057598 },
    { "Name":"Stony Brook", "Lat":42.317062, "Long":-71.104248 },
    { "Name":"Sullivan", "Lat":42.383975, "Long":-71.076994 },
    { "Name":"Tufts Medical", "Lat":42.349662, "Long":-71.063917 },
    { "Name":"Wellington", "Lat":42.40237, "Long":-71.077082 }];
red = [
    { "Name":"Alewife", "Lat":42.395428, "Long":-71.142483 },
    { "Name":"Andrew", "Lat":42.330154, "Long":-71.057655 },
    { "Name":"Ashmont", "Lat":42.284652, "Long":-71.06448899999999 },
    { "Name":"Braintree", "Lat":42.2078543, "Long":-71.0011385 },
    { "Name":"Broadway", "Lat":42.342622, "Long":-71.056967 },
    { "Name":"Central Square", "Lat":42.365486, "Long":-71.103802 },
    { "Name":"Charles/MGH", "Lat":42.361166, "Long":-71.070628 },
    { "Name":"Davis", "Lat":42.39674, "Long":-71.121815 },
    { "Name":"Downtown Crossing", "Lat":42.355518, "Long":-71.060225 },
    { "Name":"Fields Corner", "Lat":42.300093, "Long":-71.061667 },
    { "Name":"Harvard Square", "Lat":42.373362, "Long":-71.118956 },
    { "Name":"JFK/UMass", "Lat":42.320685, "Long":-71.052391 }, 
    { "Name":"Kendall/MIT", "Lat":42.36249079, "Long":-71.08617653 },
    { "Name":"North Quincy", "Lat":42.275275, "Long":-71.029583 },
    { "Name":"Park Street", "Lat":42.35639457, "Long":-71.0624242 },
    { "Name":"Porter Square", "Lat":42.3884, "Long":-71.11914899999999 },
    { "Name":"Quincy Adams", "Lat":42.233391, "Long":-71.007153 },
    { "Name":"Quincy Center", "Lat":42.251809, "Long":-71.005409 },
    { "Name":"Savin Hill", "Lat":42.31129, "Long":-71.053331 },
    { "Name":"Shawmut", "Lat":42.29312583, "Long":-71.06573796000001 },
    { "Name":"South Station", "Lat":42.352271, "Long":-71.05524200000001 },
    { "Name":"Wollaston", "Lat":42.2665139, "Long":-71.0203369 }];
