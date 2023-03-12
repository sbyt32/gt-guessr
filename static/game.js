jQuery.ajaxSetup({async:false});
$(document).ready(initialize);

var currentLoc;
var map;
var locations;
var pos = 0;
const timerEl = document.getElementById('timer');
var seconds = 0;
var timer;

function initialize()
{
    console.log('hi :)')

    $.getJSON("/api/game_sequence", {},
        function (data, textStatus, jqXHR) {
            locations = data.loc_ids;
        }
    );

    console.log(locations);


    startRound()
}

function startRound()
{
    var image;

    $.getJSON("/api/image_loc/"+locations[pos], {},
        function (data, textStatus, jqXHR) {
            image = data.url;
        }
    );

    console.log(image)

    var currentLoc = null;
    if(map)
    {
        map.remove();
    }
    $( "#map" ).empty();
    $( "#panorama" ).empty();

    createMap();
    createPano(image);
    $( "#submit" ).click(onSubmitClick);
    $( "#submit" ).addClass('deactivated');

    $( "#next" ).click(onNextClick);
    $( "#next" ).addClass('deactivated');
    timer = setInterval(updateTimer, 1000);
}

function showResults(data)
{

    const minutes = Math.floor(seconds / 60); // Calculate the number of minutes
    const remainingSeconds = seconds % 60; // Calculate the remaining seconds
    $('#round').text('Round '+(pos+1)+' out of 5');
    $('#distance').text('You guessed '+ Number((data.distance).toFixed(1)) +' feet away in ' + `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}` + '.');
    $('#score').text('Score: '+Number((data.score).toFixed(2))+'/1000');

    var zoom = 16;
    if (data.distance < 100)
    {
        zoom = 20;
    }
    if (data.distance < 300)
    {
        zoom = 19;
    }
    else if (data.distance < 1000)
    {
        zoom = 17;
    }

    var res_map = L.map('results').setView([data.actual.lat - 0.0001, data.actual.lng], zoom);

    correct = L.circleMarker([data.actual.lat, data.actual.lng], 10)
    guess = L.marker([data.guess.lat, data.guess.lng])

    correct.addTo(res_map)
    guess.addTo(res_map)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 15,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(res_map);

    enableUse($('#results'));
    enableUse($('#next'));
    $('#results').fadeTo(500, 1);
}

function onNextClick()
{
    disableUse($('#results'));
    disableUse($('#next'));
    $('#results').fadeTo(1, 0);
    pos += 1;
    startRound();
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

function enableUse(obj)
{
    obj.css("pointer-events", "all")
}

function disableUse(obj)
{
    obj.css("pointer-events", "none")
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
        $( "#submit" ).removeClass('deactivated');
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
                showResults(data);
            }
        );
    }
}

function updateTimer() {
  seconds++;
  const minutes = Math.floor(seconds / 60); // Calculate the number of minutes
  const remainingSeconds = seconds % 60; // Calculate the remaining seconds
  timerEl.innerText = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; // Update the timer DOM element with the formatted time string
}

