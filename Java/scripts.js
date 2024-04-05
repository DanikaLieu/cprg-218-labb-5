// Constants for Pokémon API
const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_API_ENDPOINT = '/pokemon';

async function fetchPokemonData(query) {
  try {
    const url = `${POKEMON_API_BASE_URL}${POKEMON_API_ENDPOINT}/${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return null;
  }
}

function createCardElement(pokemon) {
  // Limit the number of images to display
  const numImages = 3;
  const images = pokemon.sprites.front_default ? [pokemon.sprites.front_default] : [];
  if (pokemon.sprites.front_shiny) images.push(pokemon.sprites.front_shiny);
  if (pokemon.sprites.back_default) images.push(pokemon.sprites.back_default);
  if (pokemon.sprites.back_shiny) images.push(pokemon.sprites.back_shiny);
  
  // Create individual card elements for each image
  const cardElements = images.slice(0, numImages).map(image => `
    <li class="card">
      <img src="${image}" alt="">
      <div class="card-content">
        <p class="subheader">${pokemon.name}</p>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
      </div>
    </li>
  `).join('');

  return `<ul class="card-container">${cardElements}</ul>`;
}

async function renderOption2Enhanced(query) {
  const pokemonData = await fetchPokemonData(query.toLowerCase());
  if (pokemonData) {
    const cards = createCardElement(pokemonData);
    const resultsContainer = document.getElementById("filtering-option-results");
    resultsContainer.innerHTML = cards;
  } else {
    // Display error message or handle no data found scenario
    console.log("Pokemon not found.");
  }
}

function searchbarEventHandler() {
  const query = document.getElementById("searchbar").value;
  renderOption2Enhanced(query);
}

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);

renderOption2Enhanced('bulbasaur'); // Initial rendering
