//== Constant variables ==//
const $ = require('jquery');
const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js');

//== Calling addLoader function as page loads. ==//
addLoader();

//== Function for rendering movies ==//
function renderMovies() {
    $('.movies').html('');
    movieList();
}
renderMovies();

//== Get movie function that goes inside different functions (like renderMovies). ==//
function movieList() {
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id, genre}) => {
            $('.movies').append(`
            <div class="card h-100">
            <div class="card-body">
            <p>Id: ${id}</p>
            <p>Title: ${title}</p>
            <p>Rating: ${rating}</p>
            <p>Genre: ${genre}</p>
            <button id="deleteButton" class="btn btn-danger delete" value="${id}">Delete</button>
            </div>
            </div>`)
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}

//== Add movie click function ==//
$('#addMovie').click(() => {
    location.reload();
    let title = $('#inputTitle').val();
    let rating = $('#inputRating').val();
    let genre = $('#inputGenre').val();
    addMovie(title, rating, genre);
});

$('#editMovie').on('click', function (e) {
    e.preventDefault();
    location.reload();
    const editMovieID = $("#editIdInput");
    const editMovieTitle = $("#editTitle");
    const editMovieRating = $("#editRating");
    const editMovieGenre = $("#editGenre");
    editMovie(editMovieID.val(), editMovieTitle.val(), editMovieRating.val(), editMovieGenre.val());
});

//== Delete movies click function ==//
$('.movies').on('click', function (event) {
    location.reload();
    let deleteId = $(event.target).val();
    deleteMovie(deleteId);
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

//== Add a movie button JS ==//
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

//== Edit a movie button JS ==//
// Get the modal
let modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
let btn2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
let span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal
btn2.onclick = function() {
    modal2.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    modal2.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal2) {
        modal2.style.display = "none";
    }
};