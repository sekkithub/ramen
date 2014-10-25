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

for (i = 0; i < shops.length; i++) {  
    marker = new google.maps.Marker({
        content: [],
        position: new google.maps.LatLng(shops[i][1], shops[i][2]),
        animation: google.maps.Animation.DROP,
        map: map,
        icon: image
    });

    markers.push(marker);

    var boxText = document.createElement("div");
    boxText.style.cssText = "background: #f1f0ee; padding: 20px; height: 147px; border-radius: 10px;";

    var boxOptions = {
        content: boxText
        ,disableAutoPan: false
        ,maxWidth: 0
        ,pixelOffset: new google.maps.Size(-140, 0)
        ,zIndex: null
        ,boxStyle: {width: "340px"}
        ,infoBoxClearance: new google.maps.Size(1, 1)
        ,isHidden: false
        ,pane: "floatPane"
        ,enableEventPropagation: false
    };
    
    var ib = new InfoBox();
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            ib.setOptions(boxOptions);
            boxText.innerHTML =
                 '<div class="infoWindowWrapper">' +
                    '<div class="shopLogo"><img src="images/shopLogos/' + shops[i][3] + '"></div>' +
                    '<h2>' + shops[i][0] + '</h2>' +
                    '<p class="shopAddress">' + shops[i][4] + '</p>' +
                    '<p class="shopTel">' + shops[i][5] + '</p>' +
                    '<span class="shopLink"><a href="http://' + shops[i][6] + '" target="_blank">' + shops[i][6] + '</a></span>' +
                '</div>'
            ;
            ib.open(map, marker);
            map.panTo(pos);
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
    //  Go through each
    $.each(markers, function (index, marker) {
        bounds.extend(marker.position);
    });
    //  Fit these bounds to the map
    map.fitBounds(bounds);
}
AutoCenter();