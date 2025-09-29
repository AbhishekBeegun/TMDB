const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const fetchTrendingMoviesData = async () => {
    const response = await fetch(`${API_BASE_URL}/trending/movie/day?language=en-US?total_results=6`, API_OPTIONS);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  }

// User Can select 
// Popular = Default [0]
// Upcoming , [1]
// Now Playing [2]

const fetchUserCatSelectMoviesData = async ({queryKey}) => {

    let response ;

    let categories = queryKey[0];
    let page = queryKey[1];

    if (categories == 0) {
      response = await fetch(`${API_BASE_URL}/movie/popular?language=en-US&page=${page}`, API_OPTIONS);
      // console.log("Fetching Popular" , categories, page)
    }
    if (categories == 1 ) {
      response = await fetch(`${API_BASE_URL}/movie/upcoming?language=en-US&page=${page}`, API_OPTIONS);
      // console.log("Fetching upcoming" , categories, page)
    }
    if (categories == 2 ) {
      response = await fetch(`${API_BASE_URL}/movie/now_playing?language=en-US&page=${page}`, API_OPTIONS);
      // console.log("Fetching now_playing" , categories, page)
    }
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  }


const fetchMovieBySearch = async ({queryKey}) => {
    let query = queryKey[0];
    const response = await fetch(`${API_BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, API_OPTIONS);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
}

const fetchSingleMovieDetails = async (movie) => {
  const response = await fetch(`${API_BASE_URL}/movie/${movie}?language=en-US`, API_OPTIONS);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

const fetchSingleMovieVideo = async (video) => {
  const response = await fetch(`${API_BASE_URL}/movie/${video}/videos?language=en-US`, API_OPTIONS);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.results;
}

const fetchYtsMovieTorrent = async (YTSData) => {
  const response = await fetch('https://misc-api-dsjo.onrender.com/get-yts-movie-torrent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      movieTitle: YTSData.query,
      releaseYear: YTSData.year ,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const fetchMcineData = async () => {
  const response = await fetch('https://misc-api-dsjo.onrender.com/get-mcine-movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt  : 'test'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export {fetchTrendingMoviesData , fetchUserCatSelectMoviesData , fetchMovieBySearch, fetchSingleMovieDetails, fetchSingleMovieVideo ,fetchYtsMovieTorrent,fetchMcineData};