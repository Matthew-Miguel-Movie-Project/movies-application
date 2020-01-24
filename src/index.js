const $ = require('jquery');

/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, getMovie, editMovie, deleteMovie} = require('./api.js');

function renderMovies() {
    $('.movies').html('');
    getMovies().then((movies) => {
        $('.movies').html('');
        movies.forEach(({title, rating, id, genre}) => {
            $('.movies').append(`
                <div class="card h-100">
                <div class="card-body"><p>Id: ${id}</p>
                <p>Title: ${title}</p>
                <p>Rating: ${rating}</p>
                <p>Genre: ${genre}</p>
                <button id="editButton" class="btn btn-primary edit" value="${id}">Edit</button>
                <button id="deleteButton" class="btn btn-danger delete" value="${id}">Delete</button>
                </div>
                </div>`);
        });
    })
}

getMovies().then((movies) => {
    $('.movie-database').html('Here are all the movies:');
    movies.forEach(({title, rating, id, genre}) => {
        $('.movies').append(`
            <div class="card h-100">
            <div class="card-body">
            <p>Id: ${id}</p>
            <p>Title: ${title}</p>
            <p>Rating: ${rating}</p>
            <p>Genre: ${genre}</p>
            <button id="editButton" class="btn btn-primary edit" value="${id}">Edit</button>
            <button id="deleteButton" class="btn btn-danger delete" value="${id}">Delete</button>
            <form class="form1">
                <div class="form-group">
                    <label for="inputTitle">Title</label>
                    <input type="text" class="form-control editInputTitle" aria-describedby="emailHelp">
                </div>
                <div class="form-group">
                    <label for="inputRating">Rating</label>
                    <input type="text" class="form-control editInputRating">
                </div>
                <div class="form-group">
                    <label for="inputGenre">Genre</label>
                    <input type="text" class="form-control editInputGenre">
                </div>
            </form>
            </div>
        </div>`)
    });


}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

$('#addMovie').click(() => {
    let title = $('#inputTitle').val();
    let rating = $('#inputRating').val();
    let genre = $('#inputGenre').val();
    // look up inputs
    addMovie(title, rating, genre);
});

// $('#deleteMovie').click(() => {
//   let movieId = $('#deleteId').val();
//   deleteMovie(movieId);
//   renderMovies();
// });

$('.movies').on('click', '.delete', function (event) {
    let deleteId = $(event.target).val();
    deleteMovie(deleteId);
    renderMovies();
});

// this edit is for the cards
$('.movies').on('click', '.edit', function (event){
  let editId = $(event.target).val();
  // $('.editForm').toggle();
    getMovie(editId).then((movie) => {
        console.log(movie);
        // $(".formButton").click(function() {
        //     $('.form1').toggle();
        // });
    });
});

// this edit is for the form
$('.editMovie').on('click', '.edit', function (e) {
    e.preventDefault();
    $("#editForm").toggle();
    let newMovieName = $('#editTitle').val();
    let newRating = $('#editRating').val();
    let newGenre = $('#editGenre').val();
    // $('#editTitle').val('');
    // $('#editRating').val('');
    // $('#editGenre').val('');
    let movieData = {title: newMovieName, rating: newRating, genre: newGenre};
    let editId = id;
    console.log(movieData);
    editMovie(editId, movieData);
    // .then(console.log('It worked')).catch(console.log('Did not work'));
    renderMovies();
});


// getMovie().then((movies) => {
//   $('.movie-database').html('Here is your search:');
//   movies(({title, rating, id}) => {
//     $('.main-container').html(`id#${id} - ${title} - rating: ${rating} `);
//   });
//
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });


//Function for loading screen
$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function () {
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});

function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
}