function getType(typeName) {
  var requestUrl = "https://pogoapi.net/api/v1/pokemon_types.json";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Flatten the nested pokemon array
      var flattenedData = data.reduce(function (acc, val) {
        return acc.concat(val);
      }, []);
      console.log(flattenedData);
      // Filter the flattened data by type
      var filteredPokemon = flattenedData.filter(function (pokemon) {
        return pokemon.type.includes(typeName);
      });

      console.log(filteredPokemon);

      // Map each filtered Pokemon's data
      var mappedPokemonData = filteredPokemon.map(function (pokemon) {
        return {
          pokemon_id: pokemon.pokemon_id,
          pokemon_name: pokemon.pokemon_name,
          type: pokemon.type,
          // TODO- Rob: Add any other info you want to disply here
        };
      });

      console.log(mappedPokemonData);

      // Display the mapped data
      mappedPokemonData.forEach(function (pokemon) {
        var pokemonEl = document.getElementById("individual-pokemon");

        var pokeId = document.createElement("li");
        var pokeType = document.createElement("li");
        var pokeName = document.createElement("ol");

        pokeId.textContent = `Pokemon ID: ${pokemon.pokemon_id}`;
        pokeName.textContent = `Name: ${pokemon.pokemon_name}`;
        pokeType.textContent = `Type: ${pokemon.type.join(", ")}`;

        pokemonEl.appendChild(pokeName);
        pokeName.appendChild(pokeId);
        pokeName.appendChild(pokeType);
      });
    });
}
function getEncounter(typeName) {
  var requestUrl = "https://pogoapi.net/api/v1/pokemon_encounter_data.json";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Flatten the nested pokemon array
      var flattenedData = data.reduce(function (acc, val) {
        return acc.concat(val);
      }, []);

      typeResultsByName = typeName;
      // console.log(flattenedData);
      // Filter the flattened data by type

      // TODO - Thea + Rob post-MVP - Filter the flattened data by typeName = name
      var filteredPokemon = flattenedData.filter(function (pokemon) {
        typeResultsByName = pokemon.pokemon_name;

        return pokemon.pokemon_name.includes(typeResultsByName);
      });

      // console.log(filteredPokemon);

      // Map each filtered Pokemon's data
      var mappedPokemonData = filteredPokemon.map(function (pokemon) {
        return {
          pokemon_id: pokemon.pokemon_id,
          pokemon_name: pokemon.pokemon_name,
          type: pokemon.type,
          // TODO- Rob: Add any other info you want to disply here
        };
      });

      console.log(mappedPokemonData);

      // Display the mapped data
      mappedPokemonData.forEach(function (pokemon) {
        var pokemonEl = document.getElementById("individual-pokemon");

        // TODO- Rob: Create a new element for each piece of data you want to display
        var pokeId = document.createElement("ol");
        var pokeType = document.createElement("ol");
        var pokeName = document.createElement("ol");

        // TODO- Rob: Set the text content of the new elements to the data you want to display
        pokeId.textContent = `Pokemon ID: ${pokemon.pokemon_id}`;
        pokeName.textContent = `Name: ${pokemon.pokemon_name}`;
        pokeType.textContent = `Type: ${pokemon.type.join(", ")}`;

        // TODO- Rob: Append the new elements to the organized list of pokemon
        pokemonEl.appendChild(pokeName);
        pokeName.appendChild(pokeId);
        pokeName.appendChild(pokeType);
      });
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
  // console.log("places call lat and lng" + latitude + longitude);
  // console.log(uniqueType);
  function initialize(latitude, longitude, uniqueType) {
    var string = [uniqueType];
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 25,
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
      // console.log(results);
      for (var i = 0; i < results.length; i++) {
        const marker = new google.maps.Marker({
          map,
          position: results[i].geometry.location,
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
  // console.log(poketypes);
  if (pokeTypeValue == "NORMAL") {
    getType("Normal");
    // TODO- set pokename from getType to new variable to be passed as getEncounter parameter
    getEncounter("Normal");
    // console.log("Normal")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "accounting";

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
    getType("Fire");

    getEncounter("Fire");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        let placeType = "atm";

        //pass position to the map
        initPlaceMap(lat, lng, placeType);
      });
    } else {
      handleLocationError();
    }

    function handleLocationError() {
      alert("Error: The Geolocation service failed.");
    }

    // TODO - Thea: Add map funtionality to rest of types
  } else if (pokeTypeValue == "WATER") {
    getType("Water");

    getEncounter("Water");
  } else if (pokeTypeValue == "ELECTRIC") {
    getType("Electric");

    getEncounter("Electric");
  } else if (pokeTypeValue == "GRASS") {
    getType("Grass");

    getEncounter("Grass");
  } else if (pokeTypeValue == "ICE") {
    getType("Ice");

    getEncounter("Ice");
  } else if (pokeTypeValue == "FIGHTING") {
    getType("Fighting");

    getEncounter("Fighting");
  } else if (pokeTypeValue == "POISON") {
    getType("Poison");

    getEncounter("Poison");
  } else if (pokeTypeValue == "GROUND") {
    getType("Ground");

    getEncounter("Ground");
  } else if (pokeTypeValue == "FLYING") {
    getType("Flying");

    getEncounter("Flying");
  } else if (pokeTypeValue == "PSYCHIC") {
    getType("Psychic");

    getEncounter("Psychic");
  } else if (pokeTypeValue == "BUG") {
    getType("Bug");

    getEncounter("Bug");
  } else if (pokeTypeValue == "ROCK") {
    getType("Rock");

    getEncounter("Rock");
  } else if (pokeTypeValue == "GHOST") {
    getType("Ghost");

    getEncounter("Ghost");
  } else if (pokeTypeValue == "DRAGON") {
    getType("Dragon");

    getEncounter("Dragon");
  } else if (pokeTypeValue == "DARK") {
    getType("Dark");

    getEncounter("Dark");
  } else if (pokeTypeValue == "STEEL") {
    getType("Steel");

    getEncounter("Steel");
  } else if (pokeTypeValue == "FAIRY") {
    getType("Fairy");
    getEncounter("Fairy");
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
