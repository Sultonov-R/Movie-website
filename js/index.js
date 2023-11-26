const form = document.getElementById("form");
const inputSearch = document.getElementById("inputForm");
const btn = document.getElementById("btn");
const loadingSpinner = document.getElementById("loadingSpinner");
const resultContainer = document.getElementById("resultContainer");
const mainBlock = document.getElementById("mainBlock");
const selectFilm = document.getElementById("selectFilm");
const selectYear = document.getElementById("year");
const btnInfo = document.getElementById("btn-info");
const details = document.getElementById("details");
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
 

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

let dataArray = [];
let number = Math.random() * 100;

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`
    );
    const data = await response.json();
    localStorage.setItem("movies", JSON.stringify(data));
    displayCards(data.results);
  } catch (error) {
    console.log(error);
  } 
});
function displayCards(cards) {
  let data = "";
  cards.forEach((el) => {
    if (el.vote_average > 7) {
      data += `
         <div class="movie-card">
                       <img src="${IMG_PATH + el.poster_path}" alt="pc">
                       <br>
                       <span></span>
                       <h3>${el.original_title}</h3>
                       <p>Rate: ${el.vote_average}</p>
                       <p>Release date: ${el.release_date}</p>
                       <button data-movie-id = '${el.id}'>See details</button>
                   </div>
         `;
    }
  });
  mainBlock.innerHTML = data;
}

btn.addEventListener("click", function () {
  function searchInputValue() {
    if (!inputSearch.value) {
      alert("Please, enter a movie name");
    }
    if (inputSearch.value) {
      let searchedMovie = inputSearch.value.trim().toLowerCase();
      let dataMovie = JSON.parse(localStorage.getItem("movies"));

      if (dataMovie && dataMovie.results) {
        let filteredMovies = dataMovie.results.filter((ele) =>
          ele.title.toLowerCase().includes(searchedMovie)
        );

        if (filteredMovies.length > 0) {
          displayCards(filteredMovies);
        } else {
          alert("No matching movies found");
        }
      } else {
        console.error("Invalid data structure in localStorage");
      }
    }
    inputSearch.value = "";
  }
  searchInputValue(inputSearch.value);
});

// selectFilm.addEventListener('change', function() {

//   let selectedLanguage = selectFilm.value.trim().toLowerCase();
//   if(selectedLanguage.results) {
//     console.log('hi');
//     return;
//   }
//   let chooseLanguage = JSON.parse(localStorage.getItem('movies'));
//  let filteredMovies = chooseLanguage.results.filter(ele => {
//     return ele.original_language == selectedLanguage;
//   })
//   displayCards(filteredMovies);
// })

selectFilm.addEventListener("change", function () {
  let selectedLanguage = selectFilm.value.trim().toLowerCase();

  if (selectedLanguage === "all") {
    let allMovies = JSON.parse(localStorage.getItem("movies"));
    displayCards(allMovies.results);
    return;
  }

  let chooseLanguage = JSON.parse(localStorage.getItem("movies"));
  let filteredMovies = chooseLanguage.results.filter((ele) => {
    return ele.original_language.toLowerCase() == selectedLanguage;
  });
  displayCards(filteredMovies);
});

details.style.display = "none";

mainBlock.addEventListener("click", function (event) {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.closest(".movie-card")
  ) {
    let movies = JSON.parse(localStorage.getItem("movies"));
    let movieId = event.target.dataset.movieId;
    console.log(movieId);
    let selectedMovie = movies.results.find(
      (movie) => movie.id === parseInt(movieId, 10)
    );
    if (selectedMovie) {
      showDetails(selectedMovie);
    }
  }
});

function showDetails(movie) {
  const backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  const popup = document.createElement('div');
  popup.classList.add('popup');

  let detailsHTML = `
    <div class="movie-details">
      <img src="${IMG_PATH + movie.poster_path}" alt="pc">
      <br>
      <span></span>
      <h3>${movie.original_title}</h3>
      <p><b>Language</b>: ${movie.original_language}</p>
      <p><b>Rate</b>: ${movie.vote_average}</p>
      <p><b>Release date</b>: ${movie.release_date}</p>
      <p> <b>Overview</b>: ${movie.overview}</p>
      <p> <b>Popularity</b>: ${movie.popularity}</p>
    </div>
  `;

  popup.innerHTML = detailsHTML;

  document.body.appendChild(backdrop);
  document.body.appendChild(popup);

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(backdrop);
    document.body.removeChild(popup);
  });
  popup.appendChild(closeButton);
}

function loginButtonClick() {
  const backdropLogin = document.createElement('div');
  backdropLogin.classList.add('backdrop');
  const popupLogin = document.createElement('div');
  popupLogin.classList.add('popup');

  let loginHTML = `
    <form>
    <label>Login</label>
      <input type='text' placeholder = 'Username'>
      <input type='text' placeholder = 'Lastname'>
      <input type = 'password' placeholder = 'Password'
    </form>
  `;

  popupLogin.innerHTML = loginHTML;

  document.body.appendChild(backdropLogin);
  document.body.appendChild(popupLogin);

  const closeLoginButton = document.createElement('button');
  closeLoginButton.innerText = 'Close';
  closeLoginButton.addEventListener('click', () => {
    document.body.removeChild(backdropLogin);
    document.body.removeChild(popupLogin);
  });
  popupLogin.appendChild(closeLoginButton);
}

