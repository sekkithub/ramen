var mapOptions = {
  zoom: 14,
  center: new google.maps.LatLng(51.50722, -0.12750),
  disableDefaultUI: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  mapTypeControl: false,
  zoomControl: true,
  zoomControlOptions: {
    style: google.maps.ZoomControlStyle.LARGE,
    position: google.maps.ControlPosition.LEFT_CENTER
  },
  panControl: true,
  panControlOptions: {
    position: google.maps.ControlPosition.LEFT_CENTER
  },
  scaleControl: false,
  streetViewControl: false
}

var map = new google.maps.Map(document.getElementById('mapCanvas'),mapOptions);

google.maps.event.addDomListener(map, 'tilesloaded', function(){
  if($('#newPos').length==0){
    $('div.gmnoprint').last().parent().wrap('<div id="newPos"><div class="ctrl"></div></div>');
  }
});

var infowindow = new google.maps.InfoWindow();
var marker, i;
var markers = new Array();
var normalMarker = 'images/baloon.png';
var selectedMarker = 'images/baloon_active.png';
var CurrentMarkerNo = -1;

for (i = 0; i < shops.length; i++) {  

  marker = new google.maps.Marker({
    content: [],
    position: new google.maps.LatLng(shops[i][1], shops[i][2]),
    animation: google.maps.Animation.DROP,
    map: map,
    icon: normalMarker
  });
  
  markers.push(marker);

  var boxText = document.createElement("div");

  var boxOptions = {
    content: boxText,
    disableAutoPan: false,
    maxWidth: 400,
   pixelOffset: new google.maps.Size(-195, -220),
    zIndex: null,
    boxStyle: {
      width: "390px"
    },
    closeBoxMargin: "10px",
    closeBoxURL: "images/close.png",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
  };

  var ib = new InfoBox();
  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      changeMarkerImage(selectedMarker);
      function changeMarkerImage() {
        marker.setIcon(selectedMarker);
      }

      ib.setOptions(boxOptions);

      boxText.innerHTML =
        '<div class="infoWindowWrapper">' +
          '<div class="shopLogo"><img src="images/shopLogos/' + shops[i][3] + '"></div>' +
          '<div class="shopContents">' +
          '<div class="movableContents">' +
            '<h4>' + shops[i][0] + '</h4>' +
            '<p class="shopAddress">' + shops[i][4] + ' ' +
              '<a href="https://www.google.com/maps/place/' + shops[i][1] + ',' + shops[i][2] + '" target="_blank">[Open in GMaps]</a>' + 
            '</p>' +
            '<p class="shopTel">' + shops[i][5] + '</p>' +
            '<span class="shopLink"><a href="http://' + shops[i][6] + '" target="_blank">' + shops[i][6] + '</a></span>' +
            '</div>' +
          '</div>' +
        '</div>'
      ;

      ib.open(map, marker);
      map.panTo(marker.getPosition({animate: true, duration: 1.0}));

    }
  })(marker, i))  
}




/*
function changeMarkerImage() {
   if (CurrentMarkerNo >= 0) {
     console.log('selected');
      marker.setIcon(selectedMarker);
   }
   console.log('none');
   marker.setIcon(selectedMarker);
}
*/

//  Create a new viewpoint bound
function AutoCenter() {
  var bounds = new google.maps.LatLngBounds();
  //  Go through each
  $.each(markers, function (index, marker) {
    bounds.extend(marker.position);
  });
  //  Fit these bounds to the map
  map.fitBounds(bounds);
}
AutoCenter();