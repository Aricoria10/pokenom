function getType() {
    var requestUrl = 'https://pogoapi.net/api/v1/pokemon_types.json';
  
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
      const marker = 
      new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map,
          title: "Pokemon",
        });
        marker.setIcon("./assets/images/poke-logo.png");
  }

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
  
              let lat = parseFloat(position.coords.latitude);
              let lng = parseFloat(position.coords.longitude);
  
  //pass position to the map
              initMap(lat, lng)
  
          }
  
      );
  } else {
      handleLocationError();
  };
  
  
  function handleLocationError() {
  
  
      alert("Error: The Geolocation service failed.")
  
  };

function types() {
  var poketypes = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy"
  ];
  $("#poketypes").autocomplete({
    source: poketypes
  });
};

getType();