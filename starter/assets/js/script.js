// Creates date dispalyed at top of page
function headerDate () {
    var date = moment().format('dddd' + ', ' + 'MMMM Do');
    $('#currentDay').text(date);
}

// Stores the data from each time event as an object
var eventData = {};

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\TIME BLOCKS//////////////////////////////////////
// Upon Button Submit
var saveButtonEl = $('.saveBtn');

// Obtain date from input
function handleFormSubmit() {
    // Gets the text value from the submission input
    var text = $(this).siblings('textarea').val();

    // Gets the value of the ID at submission input
    var timeId = $(this).parent().attr('id');

    // Saves data to specific location denoted by Id
    saveData(timeId, text);

}

// Save data locally from input
function saveData (locationId, locationData) {
    // Stores new data into the object
    eventData[locationId] = locationData;
    localStorage.setItem("events", JSON.stringify(eventData));
    console.log(eventData);
}

// loads local data if present
function loadData () {
    // Stores new data into the object
    var storedEventData = JSON.parse(localStorage.getItem("events"));
    if (storedEventData !== null) {
        eventData = storedEventData;
    }
    applyEvents();
}

// Applies saved data to events
function applyEvents () {
    // create a variable that equals the event id
    $('div').each(function () {
        var id = $(this);
        var idValue = $(this).attr('id');

        // confirms we have an id attribute in our div
        if(idValue !== undefined) {
            // Matches if the id is present in the object
            if (eventData[idValue] !== null) {
                // grabs the textarea element and applies eventData
                id.children('textarea').val(eventData[idValue]);
            }
        }
    }
    );
}

saveButtonEl.on('click', handleFormSubmit);
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Event Color Change: Based off current time/////////////////////////////////////////////
// Set interval to update time
var refresh = setInterval(function () {
// Refreshes header date
headerDate();

// remove class values
removeEventColor ();

// get the time
getTime ();

// assign event color
assignEventColor ();

}, 1000);

getTime ();
// get time in 24-hours using moment JS
function getTime () {
    var time = moment().format('H');
    return parseInt(time);
}

// changes the color. Uses style.css classes .past .present .future
function assignEventColor () {
    var time = getTime();
    // assigns all times as past by default
    $('div').each(function () {
        var id = $(this);
        var idValue = parseInt($(this).attr('id'));
        
        if(idValue < time) {
            id.children('textarea').addClass('past');
        }
        if(idValue === time) {
            id.children('textarea').addClass('present');
        }
        if(idValue > time) {
            id.children('textarea').addClass('future');
        }
    });
}

function removeEventColor () {
    $('div textarea').each(function () {
        if($(this).hasClass('past')) {
            $(this).removeClass('past')
        }
        if($(this).hasClass('present')) {
            $(this).removeClass('present')
        }
        if($(this).hasClass('future')) {
            $(this).removeClass('future')
        }
    });
}

// Initializes program
function init () {
    headerDate();
    loadData();
    assignEventColor();
}
init();
