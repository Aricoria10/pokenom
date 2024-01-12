function getType() {
  var requestUrl = "https://pogoapi.net/api/v1/pokemon_types.json";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
    });
}

let map;
let service;

async function initMap(latitude, longitude) {
  // console.log(latitude, longitude);
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 10,
  });
  //   const marker = new google.maps.Marker({
  //     position: { lat: latitude, lng: longitude },
  //     map,
  //     title: "Pokemon",
  //   });
  //   marker.setIcon("./assets/images/poke-logo.png");
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = parseFloat(position.coords.latitude);
    let lng = parseFloat(position.coords.longitude);

    //pass position to the map
    initMap(lat, lng);
  });
} else {
  handleLocationError();
}

function handleLocationError() {
  alert("Error: The Geolocation service failed.");
}

function initPlaceMap(latitude, longitude, uniqueType) {
  function initialize(latitude, longitude, uniqueType) {
    var string = [uniqueType];
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 10,
    });

    var request = {
      location: { lat: latitude, lng: longitude },
      radius: "16000",
      type: string,
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      for (var i = 0; i < results.length; i++) {
          const marker = new google.maps.Marker({
            map,
            position: results[i].geometry.location
          });

          google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(place.name || "");
            infowindow.open(map);
          });
      }
    }
  }
  initialize(latitude, longitude, uniqueType);
}
function placebytype(pokeTypeValue) {
  var poketypes = localStorage.getItem("pokemon-types");
  if (pokeTypeValue == "NORMAL") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "supermarket";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "FIRE") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "bakery";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "WATER") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "spa";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "ELECTRIC") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "night_club";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "GRASS") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "park";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "ICE") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "cafe";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "FIGHTING") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "gym";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "POISON") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "gas_station";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "GROUND") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "campground";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "FLYING") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "airport";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "PSYCHIC") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "pharmacy";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "BUG") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "lodging";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "ROCK") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "museum";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "GHOST") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "church";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "DRAGON") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "bank";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "DARK") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "bar";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "STEEL") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "car_repair";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "FAIRY") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "beauty_salon";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  }
}
$("#subpokemon").on("click", (e) => {
  e.preventDefault();
  var pokeTypeValue = $("#poketypes").val().toString().toUpperCase();
  localStorage.setItem("pokemon-types", pokeTypeValue);
  placebytype(pokeTypeValue);
});

getType();
