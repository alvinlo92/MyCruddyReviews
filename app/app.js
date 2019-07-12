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

// repopulates restaurant review page
var showDataBaseContent = function() {
    $('.restaurant-review-page').html('');

    for (var i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        var obj = parseVal(key);
        var avg = avgRating(obj['rating']);
        var num = 0;
        if (obj['rating'].length > 1) {
            $('.restaurant-review-page').append(`<div class='restaurant'><div id='resturant-title'>${key}</div><div id='average-rating'>${avg}${fixedStarRating(avg)}<div id='number-reviews'>${obj['rating'].length} reviews</div></div><div class='${key}'></div>`);
        } else {
            $('.restaurant-review-page').append(`<div class='restaurant'><div id='resturant-title'>${key}</div><div id='average-rating'>${avg}${fixedStarRating(avg)}<div id='number-reviews'>${obj['rating'].length} review</div></div><div class='${key}'></div>`);
        }
        for (var j = 0; j < obj['rating'].length; j++) {
            if (key.indexOf(' ') > 1) {
                var arr = key.split(' ');
                key = arr.join('.');
            }
            $(`.${key}`).append(`<div class='individual-review' id='${key}${num}'><div id='user-rating'>@${obj['user'][j]}${fixedStarRating(obj['rating'][j])}</div><div class='all-reviews'>${obj['review'][j]}</div><div class='review-button-container' id='${key}${num}'></div></div>`);
            num++;
        }
    }
}

// checks if resturant key is avalible
var restaurantExists = function(key) {
    return window.localStorage.getItem(key) !== null
}

// checks if user has signed in
var isUserSignedIn = function() {
    if (!$('.welcome-header').html()) {
        return 'anonymous';
    } else {
        var welcomeHeader = $('.welcome-header').html();
        var arr = welcomeHeader.split('');
        arr.splice(0, 8);
        arr.pop();
        var user = arr.join('');
        return user;
    }
}

// grabs username from user sign in page
var getUsernameInput = function() {
    return $('#username').val();
}

// grabs admin password
var getPasswordInput = function() {
    return $('#password').val();
}

var getRestaurantNameInput = function() {
    return $('#restaurant-name').val().trim();
}

var getRatingInput = function() {
    return parseInt($('input:checked').val());
}

var getReviewInput = function() {
    return $('#user-review').val().trim();
}

var getUpdateReview = function() {
    return $('#update-review-text').val().trim()
}

var resetInput = function() {
    $('#restaurant-name').val('');
    $('#user-review').val('');
    $('.user-star-rating').html(''); // resets rating stars
    $('.user-star-rating').append(`<div class='user-star-rating'>
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="Loved it"></label>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="Liked it"></label>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="It was okay"></label>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="Disliked it"></label>
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="Hated it"></label></div>`
    );
}

// convert key value from string to object
var parseVal = function(key) {
    var retrieveObj = window.localStorage.getItem(key);
    return JSON.parse(retrieveObj);
}

// gets the average score of all review ratings
var avgRating = function(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    var avg = sum/ arr.length;
    return avg.toFixed(1);
}

// creates fixed star rating
var fixedStarRating = function(num) {
    var roundedNum = Math.floor(num);
    if (roundedNum === 5) {
        return `<div class='fixed-star-rating'>
        <input type="radio" value="5" disabled=true checked/>
        <label title="Loved it"></label>
        <input type="radio" value="4" disabled=true/>
        <label title="Loved it"></label>
        <input type="radio" value="3" disabled=true/>
        <label title="Loved it"></label>
        <input type="radio" value="2" disabled=true/>
        <label title="Loved it"></label>
        <input type="radio" value="1" disabled=true/>
        <label title="Loved it"></label></div>`;
    } else if (roundedNum === 4) {
        return `<div class='fixed-star-rating'>
        <input type="radio" value="5" disabled=true/>
        <label title="Liked it"></label>
        <input type="radio" value="4" disabled=true checked/>
        <label title="Liked it"></label>
        <input type="radio" value="3" disabled=true/>
        <label title="Liked it"></label>
        <input type="radio" value="2" disabled=true/>
        <label title="Liked it"></label>
        <input type="radio" value="1" disabled=true/>
        <label title="Liked it"></label></div>`;
    } else if (roundedNum === 3) {
        return `<div class='fixed-star-rating'>
        <input type="radio" value="5" disabled=true/>
        <label title="It was okay"></label>
        <input type="radio" value="4" disabled=true/>
        <label title="It was okay"></label>
        <input type="radio" value="3" disabled=true checked/>
        <label title="It was okay"></label>
        <input type="radio" value="2" disabled=true/>
        <label title="It was okay"></label>
        <input type="radio" value="1" disabled=true/>
        <label title="It was okay"></label></div>`;
    } else if (roundedNum === 2) {
        return `<div class='fixed-star-rating'>
        <input type="radio" alue="5" disabled=true/>
        <label title="Disliked it"></label>
        <input type="radio" value="4" disabled=true/>
        <label title="Disliked it"></label>
        <input type="radio" value="3" disabled=true/>
        <label title="Disliked it"></label>
        <input type="radio" value="2" disabled=true checked/>
        <label title="Disliked it"></label>
        <input type="radio" value="1" disabled=true/>
        <label title="Disliked it"></label></div>`;
    } else {
        return `<div class='fixed-star-rating'>
        <input type="radio" value="5" disabled=true/>
        <label title="Hated it"></label>
        <input type="radio" value="4" disabled=true/>
        <label title="Hated it"></label>
        <input type="radio" value="3" disabled=true/>
        <label title="Hated it"></label>
        <input type="radio" value="2" disabled=true/>
        <label title="Hated it"></label>
        <input type="radio" value="1" disabled=true checked/>
        <label title="Hated it"></label></div>`;
    }
}

$(document).ready(function() {
    showDataBaseContent();

    // click user button to show user sign in page
    $(document).on('click', '#user-button', function() {
        $('.sign-in-container').html('');
        $('.sign-in-container').append('Username: <input id="username"><div id="button-container"><button id="user-sign-in">Sign In</button><button id="sign-in-button">Cancel</button></div>');
    });

    // click admin button to show admin sign in page
    $(document).on('click', '#admin-button', function() {
        $('.sign-in-container').html('');
        $('.sign-in-container').append('Password: <input type="password" id="password"><div id="button-container"><button id="admin-sign-in">Sign In</button><button id="sign-in-button">Cancel</button></div>');
    });

    // allows user to edit their post and post with their name
    $(document).on('click', '#user-sign-in', function() {
        var user = getUsernameInput();
        $('.sign-in-container').html('');
        $('.sign-in-container').append(`<div class='welcome-header'>Welcome ${user}!</div><button id="sign-in-button">Log out</button>`);
    });

    // shows admin control page
    $(document).on('click', '#admin-sign-in', function() {
        if (getPasswordInput() === 'password') {
            $('.sign-in-container').html('');
            $('.sign-in-container').append('Admin Controls:<div class="edit-button"><button id="edit-database">Edit Reviews</button></div><div class="delete-button"><button id="delete-database">Delete All</button></div><button id="sign-in-button">Log out</button>');
        }
    });

    // returns back to logs out container ** need to change name
    $(document).on('click', '#sign-in-button', function() {
        $('.sign-in-container').html('');
        $('.sign-in-container').append('<button id="user-button">User</button><button id="admin-button">Admin</button>')
        $('.review-button-container').html('');

    });

    // checks if resturant obj exist, if not, create obj
    $(document).on('click', '#submit-form-post', function() {
        if (getRestaurantNameInput() === '') {
            alert('Cannot leave restaurant blank');
        } else if (getRatingInput() === undefined) {
            alert('Cannot leave ratings unchecked');
        } else if (getReviewInput() === '') {
            alert('Cannot leave ratings blank');
        } else {
            if (restaurantExists(getRestaurantNameInput())) {
                var obj = parseVal(getRestaurantNameInput());
                obj['user'].push(isUserSignedIn());
                obj['rating'].push(getRatingInput());
                obj['review'].push(getReviewInput());
                updateItem(getRestaurantNameInput(), JSON.stringify(obj));
                resetInput();
                showDataBaseContent();
            } else {
                var obj = {user: [isUserSignedIn()], rating: [getRatingInput()], review: [getReviewInput()]};
                createItem(getRestaurantNameInput(), JSON.stringify(obj));
                resetInput();
                showDataBaseContent();
            }
        }
    }); 

    // append edit and delete button to review button container
    $(document).on('click', '#edit-database', function() {
        $('.review-button-container').html('');
        $('.review-button-container').append('<button id="edit-review">Edit</button><button id="delete-review">Delete</button>');
        $('.sign-in-container').html('');
        $('.sign-in-container').append('Admin Controls:<div class="edit-button"><button id="stop-editing">Exit Editor</button></div><div class="delete-button"><button id="delete-database">Delete All</button></div><button id="sign-in-button">Log out</button>');
    });

    // button to exit out of editing tools
    $(document).on('click', '#stop-editing', function() {
        $('.sign-in-container').html('');
        $('.sign-in-container').append('Admin Controls:<div class="edit-button"><button id="edit-database">Edit Reviews</button></div><div class="delete-button"><button id="delete-database">Delete All</button></div><button id="sign-in-button">Log out</button>');
        showDataBaseContent();
    });

    // edits the individual review
    $(document).on('click', '#edit-review', function() {
        var id = $(this).closest('div').prop('id');
        var arr = id.split('');
        var index = arr.pop();
        var key = arr.join('');
        var obj = parseVal(key);
        var review = obj['review'][index]
        $(`div#${id}.individual-review`).html('');
        $(`div#${id}.individual-review`).append(`<div class='update-ratings-container'><div class='update-rating'><input type="radio" id="star5update" name="rate" value="5" /><label for="star5update" title="Loved it"></label><input type="radio" id="star4update" name="rate" value="4" /><label for="star4update" title="Liked it"></label><input type="radio" id="star3update" name="rate" value="3" /><label for="star3update" title="It was okay"></label><input type="radio" id="star2update" name="rate" value="2" /><label for="star2update" title="Disliked it"></label><input type="radio" id="star1update" name="rate" value="1" /><label for="star1update" title="Hated it"></label></div></div><textarea id='update-review-text' rows='15' cols='37'>${review}</textarea><br><button id='update-review'>Update</button><button id='cancel-update-review'>Cancel</button>`);
    });

    // deletes the individual review
    $(document).on('click', '#delete-review', function() {
        var id = $(this).closest('div').prop('id');
        var arr = id.split('');
        var index = arr.pop();
        id = arr.join('');
        var obj = parseVal(id);
        obj['rating'].splice(index, 1);
        obj['review'].splice(index, 1);
        if (confirm('Are you sure you want to delete this review?')) {
            updateItem(id, JSON.stringify(obj));
            if (obj['rating'].length === 0) {
                deleteItem(id);
            }
            showDataBaseContent();
        }
        $('.review-button-container').html('');
        $('.review-button-container').append('<button id="edit-review">Edit</button><button id="delete-review">Delete</button>');
    });

    // update individual review
    $(document).on('click', '#update-review', function() {
        var id = $(this).closest('div').prop('id');
        var arr = id.split('');
        var index = arr.pop();
        id = arr.join('');
        var obj = parseVal(id);
        $('input:checked').attr('checked',false);
        obj['rating'].splice(index, 1, getRatingInput());
        obj['review'].splice(index, 1, getUpdateReview());
        updateItem(id, JSON.stringify(obj));
        showDataBaseContent();
        $('.review-button-container').html('');
        $('.review-button-container').append('<button id="edit-review">Edit</button><button id="delete-review">Delete</button>');
    });

    // cancel updating individual review
    $(document).on('click', '#cancel-update-review', function() {
        showDataBaseContent();
        $('.review-button-container').html('');
        $('.review-button-container').append('<button id="edit-review">Edit</button><button id="delete-review">Delete</button>');
    });

    // delete all review database
    $(document).on('click', '#delete-database', function() {
        if (confirm('WARNING: Are you sure you want to delete all of the reviews?')) {
            clearDatabase();
            showDataBaseContent();
        }
    });

    $('#cancel-form-post').click(function() {
        if (confirm('Are you sure you want to cancel your post?')) {
            resetInput();
        }
    });
})