//== Constant variables ==//
const $ = require('jquery');
const {getMovies, addMovie, getMovie, editMovie, deleteMovie} = require('./api.js');

//== Calling addLoader function as page loads. ==//
addLoader();

//== Function for rendering movies ==//
function renderMovies() {
    $('.movies').html('');
    getMovies().then((movies) => {
        $('.movies').html('');
        movies.forEach(({title, rating, id, genre}) => {
            $('.movies').append(`
                <div class="card h-100">
                <div class="card-body">
                <p>Id: ${id}</p>
                <p>Title: ${title}</p>
                <p>Rating: ${rating}</p>
                <p>Genre: ${genre}</p>
                <button class="btn btn-primary edit editButton" data-toggle="collapse" data-target="#collapse" value="${id}">Edit</button>
                <button id="deleteButton" class="btn btn-danger" value="${id}">Delete</button>
                </div>
                </div>`);
        });
    })
}

//== Get movie function that goes inside different functions (like renderMovies). ==//
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
            <button data-toggle="collapse" data-target="#collapse" aria-expanded="false" aria-controls="collapseExample" id="editButton" class="btn btn-primary edit" value="${id}">Edit</button>
            <button id="deleteButton" class="btn btn-danger delete" value="${id}">Delete</button>
            </div>
            </div>`)
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

//== Add movie click function ==//
$('#addMovie').click(() => {
    let title = $('#inputTitle').val();
    let rating = $('#inputRating').val();
    let genre = $('#inputGenre').val();
    // look up inputs
    addMovie(title, rating, genre);
});

//== Delete movies click function ==//
$('.movies').on('click', function (event) {
    addLoader();
    location.reload();
    let deleteId = $(event.target).val();
    deleteMovie(deleteId);
    renderMovies();
});

//== Unused edit click function for reference ==//
// this edit is for the cards
// $('.editButton').on('click', function (event){
//   let editId = $(event.target).val();
//   $('.editForm').toggle(editId);
// });

//== This edit click function might be useful for something else. ==//
$('.editMovie').on('click', function (e) {
    e.preventDefault();
    let newMovieName = $('#editTitle').val();
    let newRating = $('#editRating').val();
    let newGenre = $('#editGenre').val();
    let movieData = {title: newMovieName, rating: newRating, genre: newGenre};
    let editId = id;
    console.log(movieData);
    editMovie(editId, movieData);
    // .then(console.log('It worked')).catch(console.log('Did not work'));
    renderMovies();
});

//== Function for loading screen ==//
function addLoader() {
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
}