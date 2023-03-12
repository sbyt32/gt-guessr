jQuery.ajaxSetup({async:false});
$(document).ready(initialize);


var res_map;
var guess;
var correct;

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
    $( "#submit" ).click(onSubmitClick);
    $( "#next" ).click(onNextClick);

    startRound();
}

function startRound()
{
    var image;

    $.getJSON("/api/image_loc/"+locations[pos], {},
        function (data, textStatus, jqXHR) {
            image = data.url;
        }
    );

    console.log(image);
    console.log(pos);

    currentLoc = null;
    if(map)
    {
        map.remove();
    }
    $( "#panorama" ).empty();

    createMap();
    createPano(image);

    seconds = 0;
    timer = setInterval(updateTimer, 1000);
    $( ".round" ).text((pos+1) + '/5')
    $( "#submit" ).addClass('deactivated');
    $( "#next" ).addClass('deactivated');
}

function showResults(data)
{

    const minutes = Math.floor(seconds / 60); // Calculate the number of minutes
    const remainingSeconds = seconds % 60; // Calculate the remaining seconds
    clearInterval(timer);

    $('#round').text('Round '+(pos+1)+' out of 5');
    $('#distance').text('You guessed '+ Number((data.distance).toFixed(1)) +' feet away in ' + `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}` + '.');
    $('#score').text('Score: '+Number((data.score).toFixed(2))+'/1000');
    $( "#next" ).removeClass('deactivated');

    if (pos == 4)
    {
        $('#next').text('Finish');
    }

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

    if (res_map)
    {
        res_map.remove()
    }

    createResMap([data.actual.lat - 0.0001, data.actual.lng], zoom)

    correct = null;
    guess = null;

    if (!correct)
    {
        correct = L.circleMarker([data.actual.lat, data.actual.lng], 10);
        correct.setStyle({color: 'red'});
        correct.addTo(res_map);
    }
    else
    {
        correct.setLatLng([data.actual.lat, data.actual.lng]);
    }

    if (!guess)
    {
        guess = L.marker([data.guess.lat, data.guess.lng]);
        guess.addTo(res_map);
    }
    else
    {
        guess.setLatLng([data.guess.lat, data.guess.lng]);
    }


    enableUse($('#results'));
    enableUse($('#next'));
    $('#results').fadeTo(500, 1);
}

function onNextClick()
{
    disableUse($('#results'));
    disableUse($('#next'));

    if (pos < 4)
    {
        pos += 1;
        $('#results').fadeTo(1, 0);
        startRound();
    }
    else
    {
        showFinish();
    }

}

function showFinish()
{
    $('#outcome').fadeTo(750, 1);
}

function createMap()
{
    var latlng = [33.77581881142522, -84.3999417178747649];
    map = L.map('map').setView(latlng, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 14,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.control.resetView({
        position: "topleft",
        title: "Reset view",
        latlng: L.latLng(latlng),
        zoom: 15,
    }).addTo(map);

    map.on('click', onMapClick);
}

function createResMap(latlng, zoom)
{
    res_map = L.map('results').setView(latlng, zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 15,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(res_map);
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
    }
    else
    {
        currentLoc.setLatLng(e.latlng);
    }
    $( "#submit" ).removeClass('deactivated');
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

