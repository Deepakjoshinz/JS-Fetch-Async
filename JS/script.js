const filter = document.getElementById("filter");
const search = document.getElementById("search");
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
    const button = document.createElement("button");
    const statsModal = document.createElement("div");
    const statsHeading = document.createElement("h3");
    const health = document.createElement("span");
    const attack = document.createElement("span");
    const defense = document.createElement("span");
    statsModal.classList.add("stats-modal");
    button.classList.add("stats-button");
    button.textContent = "View Stats";
    statsHeading.classList.add("stats-heading");
    health.classList.add("health");
    attack.classList.add("attack");
    defense.classList.add("defense");
    defense.textContent = `${obj.stats[2].stat.name}: ${obj.stats[2].base_stat} `;
    attack.textContent = `${obj.stats[1].stat.name}: ${obj.stats[1].base_stat} `;
    health.textContent = `Health: ${obj.stats[0].base_stat}`;
    statsHeading.textContent = `Stats`;

    img.src = obj.sprites.front_default;
    img.alt = obj.name;
    p.textContent = `${obj.name}`;
    typeOne.textContent = `${obj.types[0].type.name}`;

    div.classList.add("glassmorphisim-box", "filter-div");
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(typeOne);
    div.appendChild(button);

    button.addEventListener("click", () => {
      showStatsModal(obj);
    });

    colorCategories(obj, typeOne, div);

    list.appendChild(div);
  }
}
function showStatsModal(pokemon) {
  const modal = document.createElement("div");
  const modalContent = document.createElement("div");
  const closeBtn = document.createElement("span");
  const statsHeading = document.createElement("h3");
  const health = document.createElement("span");
  const attack = document.createElement("span");
  const defense = document.createElement("span");
  const modalOverlay = document.createElement("div");
  const pokemonName = document.createElement("h2");

  pokemonName.classList.add("Pokemon-Name");
  pokemonName.textContent = `${pokemon.name}`;

  modal.classList.add("modal");
  modalContent.classList.add("modal-content");
  closeBtn.classList.add("close-button");
  statsHeading.classList.add("stats-heading");
  health.classList.add("health");
  attack.classList.add("attack");
  defense.classList.add("defense");
  modalOverlay.classList.add("modal-overlay");

  health.textContent = `Health: ${pokemon.stats[0].base_stat}`;
  attack.textContent = `${pokemon.stats[1].stat.name}: ${pokemon.stats[1].base_stat}`;
  defense.textContent = `${pokemon.stats[2].stat.name}: ${pokemon.stats[2].base_stat}`;
  statsHeading.textContent = "Stats";
  closeBtn.innerHTML = "&times;";

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(statsHeading);
  modalContent.appendChild(pokemonName);
  modalContent.appendChild(health);
  modalContent.appendChild(attack);
  modalContent.appendChild(defense);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  document.body.appendChild(modalOverlay);

  closeBtn.addEventListener("click", () => {
    modal.remove();
    modalOverlay.remove();
  });

  modalOverlay.addEventListener("click", () => {
    modal.remove();
    modalOverlay.remove();
  });
}

function colorCategories(obj, typeOne, div) {
  if (obj.types[0].type.name == "grass") {
    typeOne.style.background = "rgb(104, 193, 62";
    div.classList.add("grass");
    // console.log("grass");
  } else if (obj.types[0].type.name == "fire") {
    typeOne.style.background = "rgb(234, 107, 37)";
    div.classList.add("fire");
    // console.log("fire");
  } else if (obj.types[0].type.name == "bug") {
    typeOne.style.background = "rgb(153, 173, 25)";
    div.classList.add("bug");
    // console.log("bug");
  } else if (obj.types[0].type.name == "water") {
    typeOne.style.background = "rgb(86, 121, 236)";
    div.classList.add("water");
    // console.log("water");
  } else if (obj.types[0].type.name == "poison") {
    typeOne.style.background = "rgb(140, 39, 142)";
    div.classList.add("poison");
    // console.log("poison");
  } else if (obj.types[0].type.name == "electric") {
    typeOne.style.background = "rgb(246, 200, 38)";
    div.classList.add("electric");
    // console.log("electric");
  } else if (obj.types[0].type.name == "ground") {
    typeOne.style.background = "rgb(216, 180, 86)";
    div.classList.add("ground");
    // console.log("ground");
  } else if (obj.types[0].type.name == "fairy") {
    typeOne.style.background = "rgb(231, 132, 156)";
    div.classList.add("fairy");
    // console.log("fairy");
  } else if (obj.types[0].type.name == "fighting") {
    typeOne.style.background = "rgb(176, 30, 31)";
    div.classList.add("fighting");
    // console.log("fighting");
  } else if (obj.types[0].type.name == "psychic") {
    typeOne.style.background = "rgb(244, 61, 117)";
    div.classList.add("psychic");
    // console.log("psychic");
  } else if (obj.types[0].type.name == "rock") {
    typeOne.style.background = "rgb(168, 145, 44)";
    div.classList.add("rock");
    // console.log("rock");
  } else if (obj.types[0].type.name == "ghost") {
    typeOne.style.background = "rgb(92, 66, 134)";
    div.classList.add("ghost");
    // console.log("ghost");
  } else if (obj.types[0].type.name == "ice") {
    typeOne.style.background = "rgb(137, 208, 207)";
    div.classList.add("ice");
    // console.log("ice");
  } else if (obj.types[0].type.name == "dragon") {
    typeOne.style.background = "rgb(91, 16, 246)";
    div.classList.add("dragon");
    // console.log("dragon");
  } else {
    typeOne.style.background = "rgb(151, 144, 101)";
    div.classList.add("normal");
    // console.log("normal");
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

function filterSelection(category) {
  const divs = document.getElementsByClassName("filter-div");
  if (category === "") {
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.display = "grid";
    }
  } else {
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].classList.contains(category)) {
        divs[i].style.display = "grid";
      } else {
        divs[i].style.display = "none";
      }
    }
  }
}

//event listeners for the filter buttons
const btnContainer = document.getElementById("button-container");
const btns = btnContainer.getElementsByClassName("btn");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";

    const category = this.value;
    filterSelection(category);
  });
}
// Add event listener to the "Show All" button
const showAllBtn = document.getElementById("all");
showAllBtn.addEventListener("click", function () {
  renderArray(pokemonData);
});
