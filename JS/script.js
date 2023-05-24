const filter = document.getElementById("filter");
const search = document.getElementById("search");
const resultHeading = document.getElementById("resultsHeading");
const pageEffect = document.getElementById("page-effect");
const list = document.getElementById("pokeList");
const pokemonData = [];

// Define the fetchPokemonData function as a named function declaration
async function fetchPokemonData() {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=152 ")
    .then((response) => response.json())
    .then(async (json) => {
      const promises = json.results.map(async (result) => {
        return fetch(result.url)
          .then((response) => response.json())
          .then((data) => {
            pokemonData.push(data);
          })
          .catch((error) => console.error(error));
      });

      return Promise.all(promises).then(() => {
        return pokemonData;
      });
    })
    .catch((error) => console.error(error));
}

// Call the fetchPokemonData() function to retrieve data from the API
fetchPokemonData().then((pokemonData) => {
  console.log(pokemonData);
  renderArray(pokemonData);
});

// Define the renderArray function
function renderArray(pokemonData) {
  list.innerHTML = "";

  for (let i = 0; i < pokemonData.length; i++) {
    const div = document.createElement("div");
    const obj = pokemonData[i];
    const img = document.createElement("img");
    const typeOne = document.createElement("a");
    const p = document.createElement("p");

    div.classList.add("glassmorphisim-box");

    img.src = obj.sprites.front_default;
    img.alt = obj.name;

    p.textContent = `${obj.name}`;

    typeOne.textContent = `${obj.types[0].type.name}`;

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(typeOne);
    list.appendChild(div);

    pageEffect.classList.remove("glassmorphisim");
    pageEffect.classList.add("glassmorphisim");

    colorCatergories(obj, typeOne);
  }
}

function colorCatergories(obj, typeOne) {
  if (obj.types[0].type.name == "grass") {
    typeOne.style.background = "rgb(104, 193, 63)";
    console.log("grass");
  } else if (obj.types[0].type.name == "fire") {
    typeOne.style.background = "rgb(234, 107, 37)";
    console.log("fire");
  } else if (obj.types[0].type.name == "bug") {
    typeOne.style.background = "rgb(153, 173, 25)";
    console.log("bug");
  } else if (obj.types[0].type.name == "water") {
    typeOne.style.background = "rgb(86, 121, 236)";
    console.log("water");
  } else if (obj.types[0].type.name == "poison") {
    typeOne.style.background = "rgb(140, 39, 142)";
    console.log("poison");
  } else if (obj.types[0].type.name == "electric") {
    typeOne.style.background = "rgb(246, 200, 38)";
    console.log("electric");
  } else if (obj.types[0].type.name == "ground") {
    typeOne.style.background = "rgb(216, 180, 86)";
    console.log("ground");
  } else if (obj.types[0].type.name == "fairy") {
    typeOne.style.background = "rgb(231, 132, 156)";
    console.log("fairy");
  } else if (obj.types[0].type.name == "fighting") {
    typeOne.style.background = "rgb(176, 30, 31)";
    console.log("fighting");
  } else if (obj.types[0].type.name == "psychic") {
    typeOne.style.background = "rgb(244, 61, 117)";
    console.log("psychic");
  } else if (obj.types[0].type.name == "rock") {
    typeOne.style.background = "rgb(168, 145, 44)";
    console.log("rock");
  } else if (obj.types[0].type.name == "ghost") {
    typeOne.style.background = "rgb(92, 66, 134)";
    console.log("ghost");
  } else if (obj.types[0].type.name == "ice") {
    typeOne.style.background = "rgb(137, 208, 207)";
    console.log("ice");
  } else if (obj.types[0].type.name == "dragon") {
    typeOne.style.background = "rgb(91, 16, 246)";
    console.log("dragon");
  } else {
    typeOne.style.background = "rgb(151, 144, 101)";
    console.log("normal");
  }
}
// Define sort functions
function sortAscending() {
  pokemonData.sort((a, b) => a.name.localeCompare(b.name));
  renderArray(pokemonData);
}

function sortDescending() {
  pokemonData.sort((a, b) => b.name.localeCompare(a.name));
  renderArray(pokemonData);
}

// Add event listeners to the filter dropdown
filter.addEventListener("change", () => {
  const selectedOption = filter.value;

  if (selectedOption === "az") {
    sortAscending();
  } else if (selectedOption === "za") {
    sortDescending();
  }
});

// Define the search function
function searchPokemon(query) {
  const filteredData = pokemonData.filter((pokemon) => {
    const name = pokemon.name.toLowerCase();
    return name.includes(query.toLowerCase());
  });

  renderArray(filteredData);
}

// Add event listener to the search input
search.addEventListener("input", () => {
  const query = search.value.trim();
  searchPokemon(query);
});
