function initMap() {
    
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
      
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 29.7189, lng: -95.3392},
    mapTypeControl: false,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_TOP,
    }
  });

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('right-panel'));

  var control = document.getElementById('floating-panel');
  control.style.display = 'block';
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(control);

  var onChangeHandler = function() {
    if(document.getElementById('start').value!=='' && document.getElementById('end').value!==''){  
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('right-panel').style.display="inline-block";
        google.maps.event.trigger(map, "resize");
    }
  };
  
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
  document.getElementById('transport').addEventListener('change', onChangeHandler); 
  
  var ctaLayer = new google.maps.KmlLayer({
          url: 'https://www.dropbox.com/s/jbjk0sh3wmov01v/U%20of%20H%20parking%20lot%20and%20traffic%20status.kmz?dl=1',
          map: map
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
    
  if(document.getElementById('transport').value=="walking"){
      var travel = google.maps.TravelMode.WALKING; 
  }
    else
        {
            var travel = google.maps.TravelMode.DRIVING; 
        }
     
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: travel
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function getCurrentLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCurrentLocation);
    }
    else {
      alert("Geolocation is not supported by this browser");
    }
}

function setCurrentLocation(position){
    var location = position.coords.latitude + "," + position.coords.longitude;
    document.getElementsByClassName("myLocation")[0].setAttribute("value", location);
    
}

String.prototype.format = function () {
    var args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a){
        return args[+(a.substr(1,a.length-2))||0];
    });
};
        
function myFunction(){
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var mode = document.getElementById('transport').value;
    if(document.getElementById('start').textContent == 'Current Location'){
        var url = "google.navigation:q={0}&mode={1}".format(end, mode);
    }
    else{
        var url = "http://maps.google.com/maps?saddr={0}&daddr={1}&mode={2}".format(start, end, mode);
        window.location.href = url;
    }
}

