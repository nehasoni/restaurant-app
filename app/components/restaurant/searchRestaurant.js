App.controller('searchRestaurantController', function($scope,$http) {
    //getRestaurants()
    function getRestaurants(lat,lng){
        $http({
            method: 'GET',
            url: "https://developers.zomato.com/api/v2.1/search?lat="+lat+"&lon="+lng,
            headers: {
                'Content-Type': undefined,
                'user-key':"f75c50aa262ebbb8ae84a0296575ec7d",
                "Accept": "application/json"
            }
        }).then(function successCallback(response) {
            $scope.restaurants = response.data.restaurants
           $scope.showResult = true
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    $scope.$on('mapInitialized', function (evt, evtmap) {
        var newloc = new google.maps.LatLng(28.7041, 77.1025);
        evtmap.setCenter(newloc);
        initAutocomplete(evtmap)
    })

    function initAutocomplete(map) {

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));
                getRestaurants(place.geometry.location.lat(),place.geometry.location.lng())
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    }

});
