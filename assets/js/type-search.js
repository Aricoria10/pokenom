function getType() {
  var requestUrl = "https://pogoapi.net/api/v1/pokemon_types.json";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

let map;

async function initMap(latitude, longitude) {
  console.log(latitude, longitude);
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

function initPlaceMap(latitude, longitude) {
  console.log("places call lat and lng" + latitude + longitude);
  function initialize() {
    const typeString = "graveyard";
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    });

    const request = {
      location: { lat: latitude, lng: longitude },
      radius: "16000",
      query: `${typeString} `,
      fields: ["type"],
    };
    // console.log(request);
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        console.log(results[i]);
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }

        map.setCenter(results[0].geometry.location);
      }
    });
  }
  initialize();
}
function placebytype(pokeTypeValue) {
  var poketypes = localStorage.getItem("pokemon-types");
  // console.log(poketypes);
  if (pokeTypeValue == "NORMAL") {
    // console.log("Normal")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);

        //pass position to the map
        initPlaceMap(lat, lng);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }
  } else if (pokeTypeValue == "FIRE") {
    console.log("Fire");
  } else if (pokeTypeValue == "WATER") {
    console.log("Water");
  } else if (pokeTypeValue == "ELECTRIC") {
    console.log("Electric");
  } else if (pokeTypeValue == "GRASS") {
    console.log("Grass");
  } else if (pokeTypeValue == "ICE") {
    console.log("Ice");
  } else if (pokeTypeValue == "FIGHTING") {
    console.log("Fighting");
  } else if (pokeTypeValue == "POISON") {
    console.log("Poison");
  } else if (pokeTypeValue == "GROUND") {
    console.log("Ground");
  } else if (pokeTypeValue == "FLYING") {
    console.log("Flying");
  } else if (pokeTypeValue == "PSYCHIC") {
    console.log("Psychic");
  } else if (pokeTypeValue == "BUG") {
    console.log("Bug");
  } else if (pokeTypeValue == "ROCK") {
    console.log("Rock");
  } else if (pokeTypeValue == "GHOST") {
    console.log("Ghost");
  } else if (pokeTypeValue == "DRAGON") {
    console.log("Dragon");
  } else if (pokeTypeValue == "DARK") {
    console.log("Dark");
  } else if (pokeTypeValue == "STEEL") {
    console.log("Steel");
  } else if (pokeTypeValue == "FAIRY") {
    console.log("Fairt");
  }
}
$("#subpokemon").on("click", (e) => {
  e.preventDefault();
  var pokeTypeValue = $("#poketypes").val().toString().toUpperCase();
  // console.log(pokeTypeValue);
  localStorage.setItem("pokemon-types", pokeTypeValue);
  placebytype(pokeTypeValue);
});

getType();
