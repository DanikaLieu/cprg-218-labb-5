
const NEWS_API_KEY = '8b9e6ac56923414fa2aa072cea1c636e';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const NEWS_API_ENDPOINT = '/everything';


function createCardElement(item) {
  return `
    <li class="card">
      <img src="${item.urlToImage}" alt="">
      <div class="card-content">
        <p class="subheader">${item.source.name}</p>
        <h3 class="header">${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </li>
  `;
}

/**
 * Create multiple cards from an array of news item data.
 */
function createCardElements(data) {
  return data.map(createCardElement).join("");
}

/**
 * Fetch news data.
 */
async function fetchNewsData(query) {
  try {
    const url = `${NEWS_API_BASE_URL}${NEWS_API_ENDPOINT}?q=${query}&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news data:', error);
    return [];
  }
}


async function renderOption2Enhanced(query) {
  const newsData = await fetchNewsData(query);
  const cards = createCardElements(newsData);
  const resultsContainer = document.getElementById("filtering-option-results");
  resultsContainer.innerHTML = cards;
}

/**
 * Option 2 Enhanced: Search bar event handler.
 */
function searchbarEventHandler() {
  const query = document.getElementById("searchbar").value;
  renderOption2Enhanced(query);
}


const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);


renderOption2Enhanced('technology'); 
