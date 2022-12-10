

function estimateHouse(e) {
    e.preventDefault();
    let btn = document.getElementById('estimate');
    let img = document.createElement('img');

    img.src = './assets/loader.svg';

    // append the loader to the button
    btn.innerHTML = '';
    btn.append(img);

    // get the input value
    let input = document.getElementById('home_address');
    let address = input.value;

    setTimeout(() => {
        // hide the old form 
        let form = document.getElementById('estimate-form');
        form.classList.add('d-none');

        // change header alignment
        let header = document.getElementById('header');
        header.classList.remove('justify-content-center')
        header.classList.add('justify-content-md-end')
        header.classList.add('justify-content-center')

        // show the result form
        let result = document.getElementById('result');
        result.classList.remove('d-none');

        // change the address label
        let label = document.getElementById('address_label');
        label.innerHTML = address;


        initializeMap(address);
    }, 3000);
}

var map;
var service;
var infowindow;

function initializeMap(address) {
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    var request = {
        // query: 'Museum of Contemporary Art Australia',
        query: address,
        fields: ['name', 'geometry'],
    };

    service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
