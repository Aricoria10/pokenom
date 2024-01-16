//java script for collapsple poke data
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});

function getType(typeName) {
  var requestUrl = "https://pogoapi.net/api/v1/pokemon_types.json";
// fetch pokemon go api
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Flatten the nested pokemon array
      var flattenedData = data.reduce(function (acc, val) {
        return acc.concat(val);
      }, []);
      // console.log(flattenedData);
      // Filter the flattened data by type
      var filteredPokemon = flattenedData.filter(function (pokemon) {
        return pokemon.type.includes(typeName);
      });

      // console.log(filteredPokemon);

      // Map each filtered Pokemon's data
      var mappedPokemonData = filteredPokemon.map(function (pokemon) {
        return {
          pokemon_id: pokemon.pokemon_id,
          pokemon_name: pokemon.pokemon_name,
          type: pokemon.type,
        };
      });

      // <ul class="collapsible">
//     <li>
//     <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
//     <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
//   </li>
//   <li>
//     <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
//     <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
//   </li>
//   <li>
//     <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
//     <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
//   </li>
// </ul>
      // Display the mapped data
      mappedPokemonData.forEach(function (pokemon) {
        var pokemonEl = document.getElementById("individual-pokemon");

        var pokeId = document.createElement("div");
        var pokeType = document.createElement("div");
        var pokeName = document.createElement("div");
        var empty = document.createElement("li");
        var div = document.createElement("div");


// appending mapped dating and adding them to html sheed
        pokeId.textContent = `Pokemon ID: ${pokemon.pokemon_id}`;
        pokeName.textContent = `Name: ${pokemon.pokemon_name}`;
        pokeType.textContent = `Type: ${pokemon.type}`;
        pokemonEl.appendChild(empty);
empty.appendChild(pokeName); pokeName.classList.add("collapsible-header");
empty.appendChild(pokeId);pokeId.classList.add("collapsible-body");
empty.appendChild(pokeType);pokeType.classList.add("collapsible-body");
       
      
      });
    });
}
// This is grabbing infor from the encounter array of pokemon go api
// function getEncounter(typeName) {
//   var requestUrl = "https://pogoapi.net/api/v1/pokemon_encounter_data.json";

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // console.log(data);
//       // Flatten the nested pokemon array
//       var flattenedData = data.reduce(function (acc, val) {
//         return acc.concat(val);
//       }, []);

//       typeResultsByName = typeName;
//       // console.log(flattenedData);
//       // Filter the flattened data by type

//       var filteredPokemon = flattenedData.filter(function (pokemon) {
//         typeResultsByName = pokemon.pokemon_name;

//         return pokemon.pokemon_name.includes(typeResultsByName);
//       });

//       // Map each filtered Pokemon's data
//       var mappedPokemonData = filteredPokemon.map(function (pokemon) {
//         return {
//           pokemon_id: pokemon.pokemon_id,
//           pokemon_name: pokemon.pokemon_name,
//           type: pokemon.type,
//         };
//       });

//       console.log(mappedPokemonData);

//       // Display the mapped data
//       mappedPokemonData.forEach(function (pokemon) {
//         var pokemonEl = document.getElementById("individual-pokemon");

//         //creating new ordler lists for the pokemon info
//         var pokeId = document.createElement("ol");
//         var pokeType = document.createElement("ol");
//         var pokeName = document.createElement("ol");

//         pokeId.textContent = `Pokemon ID: ${pokemon.pokemon_id}`;
//         pokeName.textContent = `Name: ${pokemon.pokemon_name}`;
//         pokeType.textContent = `Type: ${pokemon.type.join(", ")}`;
//         //adding info to page
//         pokemonEl.appendChild(pokeName);
//         pokeName.appendChild(pokeId);
//         pokeName.appendChild(pokeType);
//       });
//     });
// }

let map;
let service;

//this is adding the google map to the page

async function initMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 10,
  });
}
// this is finding the user's location to conduct the search
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
//centering the map on the search area
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
// this function addes marker to each result as well as an info window to each marker
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        const marker = new google.maps.Marker({
          map,
          position: results[i].geometry.location,
        });
        const infowindow = new google.maps.InfoWindow({
          content: results[i].name,
          ariaLabel: results.name
        });
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map
          });
        });
        }
      }
    }
    initialize(latitude, longitude, uniqueType);
  }
  //this is the function for the drop down. After the user selects the pokemon type the function will pass the placetype to the goggles map function to search for placetypes nearby
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
    getType("Normal");
    // TODO- set pokename from getType to new variable to be passed as getEncounter parameter
    // getEncounter("Normal");
    // console.log("Normal")
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
     getType("Fire");

    // getEncounter("Fire");
    // TODO - Thea: Add map funtionality to rest of types
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
    getType("Water");

    // getEncounter("Water");
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
    getType("Electric");

    // getEncounter("Electric");
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
    getType("Grass");

    // getEncounter("Grass");
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
    getType("Ice");

    // getEncounter("Ice");
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
    getType("Fighting");

    // getEncounter("Fighting");
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
    getType("Poison");

    // getEncounter("Poison");
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
    getType("Ground");

    // getEncounter("Ground");
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
    getType("Flying");

    // getEncounter("Flying");
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
    getType("Psychic");

    // getEncounter("Psychic");
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
    getType("Bug");

    // getEncounter("Bug");
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
    getType("Rock");

    // getEncounter("Rock");
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
    getType("Ghost");

    // getEncounter("Ghost");
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
    getType("Dragon");

    // getEncounter("Dragon");
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
    getType("Dark");

    // getEncounter("Dark");
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
    getType("Steel");

    // getEncounter("Steel");
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
    getType("Fairy");
    // getEncounter("Fairy");
  }
}
// event listener for the the search function
$("#subpokemon").on("click", (e) => {
  e.preventDefault();
  //converts the input to a string and then makes it all upper in case user entered pokemon type correctly
  var pokeTypeValue = $("#poketypes").val().toString().toUpperCase();
  localStorage.setItem("pokemon-types", pokeTypeValue);
  placebytype(pokeTypeValue);
});

getType();
