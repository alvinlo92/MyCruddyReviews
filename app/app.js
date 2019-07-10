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

var getNameInput = function() {
    return $('.name').val();
}

var getReviewInput = function() {
    return $('.review').val();
}

var getRatingInput = function() {
    return $('input:checked').val();
}

var resetInput = function() {
    $('.name').val('');
    $('.review').val('');
}

$(document).ready(function() {
    $('.post').click(function() {
        createItem(getNameInput(), getReviewInput());
    });

    $('.cancel').click(function() {
        resetInput();
    });
})

// post is create
// cancel is delete
// edit post is going to be update
// clear database is remove all reviews

// have generic resturant1, restaurant2... as key
// use object as value