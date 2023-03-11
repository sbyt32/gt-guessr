jQuery.ajaxSetup({async:false});
$(document).ready(initialize);

var currentLoc;
var map;
var locations;
var pos = 0;

function initialize()
{
    console.log('hi :)')

    $.getJSON("/api/game_sequence", {},
        function (data, textStatus, jqXHR) {
            locations = data.loc_ids;
        }
    );

    console.log(locations);

    var image;

    $.getJSON("/api/image_loc/"+locations[0], {},
        function (data, textStatus, jqXHR) {
            image = data.url;
        }
    );

    createMap();
    createPano(image);
    $( "#submit" ).click(onSubmitClick);
}

function createMap()
{
    map = L.map('map').setView([33.77593881142522, -84.396317178747649], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 14,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('click', onMapClick);
}

function createPano(src)
{
    pannellum.viewer('panorama', {
        "type": "equirectangular",
        "panorama": src,
        "autoLoad": true,
        "minPitch": -20,
        "maxPitch": 20,
        "compass": false,
        "showFullscreenCtrl": false,
    });
}

function onMapClick(e) {
    if (!currentLoc)
    {
        currentLoc = L.marker(e.latlng);
        currentLoc.addTo(map);
    }
    else
    {
        currentLoc.setLatLng(e.latlng);
    }
}

function onSubmitClick(e) {
    e.preventDefault();

    if (currentLoc)
    {
        loc = currentLoc.getLatLng();
        $.post("/api/answer/"+ locations[pos] + "/"+ loc.lat +"/"+ loc.lng, {},
            function (data, textStatus, jqXHR) {
                console.log(data)
            }
        );
    }
}