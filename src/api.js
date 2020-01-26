module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json())
  },
  getMovie: (id) => {
    console.log(id);
    return fetch(`/api/movies/${id}`, {
      method: 'GET'
    })
        .then(data => data.json())
  },
  addMovie: (title, rating, genre) => {
    let newMovie = {title:title,rating:rating, genre:genre};
    console.log(newMovie);
    return fetch('/api/movies', {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newMovie)
    })
  },
  editMovie: (id, title, rating, genre) => {
    let editMovie = {title:title,rating:rating, genre:genre};
    // console.log(editMovie);
    return fetch(`/api/movies/${id}`, {
      method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(editMovie)
    })
  },
  deleteMovie: (id) => {
    return fetch(`/api/movies/${id}`, {
      method: 'DELETE', headers: {'Content-Type': 'application/json'}
    })
  }
};