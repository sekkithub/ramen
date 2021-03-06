var markers = new Array();
var normalMarker = 'images/baloon.png';
var selectedMarker = 'images/baloon_active.png';
var gmarkers = [];

$(function initialize() {
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.523528, -0.116497),
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
  var map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
  
  // Controller add div
  google.maps.event.addDomListener(map, 'tilesloaded', function(){
    if($('#newPos').length==0){
      $('div.gmnoprint').last().parent().wrap('<div id="newPos"><div class="ctrl"></div></div>');
    }
  });
  
  setMarkers(map, shops);
  ib = new google.maps.InfoWindow({
      content: ""
  });
});

function setMarkers(map, markers) {
  for (var i = 0; i < markers.length; i++) {
    var shops = markers[i];
    var shopLatLng = new google.maps.LatLng(shops[1], shops[2]);
    var boxText = document.createElement("div");
    var boxOptions = {
      content: boxText,
      disableAutoPan: false,
      maxWidth: 400,
      pixelOffset: new google.maps.Size(-195, -214),
      zIndex: 10000,
      boxStyle: { width: "390px" },
      closeBoxMargin: "10px",
      closeBoxURL: "images/close.png",
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false
    };
    
    var marker = new google.maps.Marker({
      content: [],
      position: new google.maps.LatLng(shops[1], shops[2]),
      animation: google.maps.Animation.DROP,
      map: map,
      icon: normalMarker,
      html: boxText
    });

    var ib = new InfoBox();

    // infoBox options
    ib.setOptions(boxOptions);

    // infoBox contents
    boxText.innerHTML =
      '<div class="infoWindowWrapper">' +
        '<div class="shopLogo"><img src="images/shopLogos/' + shops[3] + '"></div>' +
        '<div class="shopContents">' +
        '<div class="movableContents">' +
          '<h4>' + shops[0] + '</h4>' +
          '<p class="shopAddress">' + shops[4] + ' ' +
            '<a href="https://www.google.com/maps/place/' + shops[1] + ',' + shops[2] + '" target="_blank">[Open in GMaps]</a>' + 
          '</p>' +
          '<p class="shopTel">' + shops[5] + '</p>' +
          '<span class="shopLink"><a href="http://' + shops[6] + '" target="_blank">' + shops[6] + '</a></span>' +
          '</div>' +
        '</div>' +
      '</div>'
    ;

    google.maps.event.addListener(marker, 'click', function(marker, i) {
      // reset marker image when you click the other marker
      for(var i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setIcon(normalMarker);
      }
      // change marker image when you click a marker
      this.setIcon(selectedMarker);
      // set infoBox content
      ib.setContent(this.html);
      // open infoBox
      ib.open(map, this);
      // move to centre when you click a marker
      map.panTo(ib.getPosition({animate: true, duration: 1.0}));
    });

    // reset marker icon when you click close button on infoBox
    google.maps.event.addListener(ib, 'closeclick', function() {
      for(var i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setIcon(normalMarker);
      }
    });
    // push a marker to the array
    gmarkers.push(marker);
  }
}