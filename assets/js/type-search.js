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

function placebytype() {
  var typeinput = poketypes
  if (xx == normal) {

  } else if (xx == Fire){

  } else if (xx == Water){

  } else if (xx == Electric){

  } else if (xx == Grass) {

  } else if (xx == Ice) {

  } else if (xx == Fighting){

  } else if (xx == Posion){

  } else if (xx == Ground){

  } else if (xx == Flying){

  } else if (xx == Psychic){

  } else if (xx == Bug){

  } else if (xx == Rock){

  } else if (xx == Ghost){

  } else if (xx == Dragon){

  } else if (xx == Dark){

  } else if (xx == Steel){

  } else if (xx == Fairy) {

  }
}

$("#poketypes").on("click",() => {
  placebytype($("#poketypes").val());
});

getType();