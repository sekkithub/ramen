var map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 14,
    center: new google.maps.LatLng(51.50722, -0.12750),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
});

var infowindow = new google.maps.InfoWindow();

var marker, i;
var markers = new Array();
var image = 'images/baloon.png';

for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
        content: [],
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        animation: google.maps.Animation.DROP,
        map: map,
        icon: image
    });

    markers.push(marker);

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
        }
    })(marker, i));
}

function drop() {
    for (var i =0; i < marker.length; i++) {
        setTimeout(function() {
            addMarkerMethod();
        }, i * 200);
    }
}

function toggleBounce() {
    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


function AutoCenter() {
//  Create a new viewpoint bound
var bounds = new google.maps.LatLngBounds();
//  Go through each...
$.each(markers, function (index, marker) {
bounds.extend(marker.position);
});
//  Fit these bounds to the map
map.fitBounds(bounds);
}
AutoCenter();

