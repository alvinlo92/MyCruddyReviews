// localStorage functions
var createItem = function(key, value) {
    return window.localStorage.setItem(key, value);
}
var updateItem = function(key, value) {
    return window.localStorage.setItem(key, value);
}

var deleteItem = function(key) {
    return window.localStorage.removeItem(key);
}

var clearDatabase = function() {
    return window.localStorage.clear();
}

var showDataBaseContent = function() {
    $('.restaurantPage').html('');

    for (var i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        var obj = parseVal(key);
        var avg = avgRating(obj['rating']);
        $('.restaurantPage').append(`<div class='restaurant'><div>${key}</div><div>${avg}</div><div class='reviews'></div>`);

        for (var j = 0; j < obj['rating'].length; j++) {
            $('.reviews').append(`<div>${obj['rating'][j]}</div><div>${obj['review'][j]}</div>`)
        }
    }
}

var restaurantExists = function(key) {
    return window.localStorage.getItem(key) !== null
}

var getPasswordInput = function() {
    return $('#password').val();
}

var getRestaurantNameInput = function() {
    return $('#restaurantName').val();
}

var getUserNameInput = function() {
    return $('#userName').val();
}

var getRatingInput = function() {
    return $('input:checked').val();
}

var getReviewInput = function() {
    return $('#userReview').val();
}   

var resetInput = function() {
    $('#restaurantName').val('');
    $('#userName').val('');
    $('#userReview').val('');
    $('.userRating').html('');  // clears rating div
    $('.userRating').append(    // repopulates stars
        `<div class='userRating'>
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="Loved it"></label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="Liked it"></label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="It was okay"></label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="Disliked it"></label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="Hated it"></label>
        </div>`);
}

// convert value string into object
var parseVal = function(key) {
    var retrieveObj = window.localStorage.getItem(key);
    return JSON.parse(retrieveObj);
}

// gets average rating of ratings
var avgRating = function(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    var avg = sum/ arr.length;
    return avg.toFixed(1);
}

// creates fixed rating stars
var generateUserRating = function() {
    return `<div class='userRating'>
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="Loved it"></label>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="Liked it"></label>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="It was okay"></label>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="Disliked it"></label>
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="Hated it"></label>
    </div>`
}

$(document).ready(function() {
    showDataBaseContent();

    // prints admin sign in form
    $(document).on('click', '#admin-sign-in', function() {
        $('.admin').html('');
        $('.admin').append('Password: <input type="password" id="password"><div id="button-container"><button id="sign-in">Sign In</button><button id="cancel-sign-in">Cancel</button></div>');
    });

    // prints admin controls
    $(document).on('click', '#sign-in', function() {
        if (getPasswordInput() === 'password') {
            $('.admin').html('');
            $('.admin').append('Admin Controls<div class="delete-button"><button id="delete-database">DELETE ALL REVIEWS</button></div><button id="cancel-sign-in">Log out</button>');
        }
    });

    // delete database
    $(document).on('click', '#delete-database', function() {
        if (confirm('WARNING: Are you sure you want to delete all of the reviews?')) {
            if (confirm('Are you REALLY sure? This cannot be undone.')) {
                clearDatabase();
            }
        }
    })

    $(document).on('click', '#cancel-sign-in', function() {
        $('.admin').html('');
        $('.admin').append('<button id="admin-sign-in">Administrator Sign In</button>');
    });

    $('#post').click(function() {
        if (restaurantExists(getRestaurantNameInput())) {
            var obj = parseVal(getRestaurantNameInput());
            obj['rating'].push(parseInt(getRatingInput()));
            obj['review'].push(getReviewInput());
            updateItem(getRestaurantNameInput(), JSON.stringify(obj));
        } else {
            var obj = {rating: [parseInt(getRatingInput())], review: [getReviewInput()]};
            createItem(getRestaurantNameInput(), JSON.stringify(obj));
        }
        resetInput();
        showDataBaseContent();
    });

    $('#cancelPost').click(function() {
        if (confirm('Are you sure you want to cancel your post?')) {
            resetInput();
        }
    });
})