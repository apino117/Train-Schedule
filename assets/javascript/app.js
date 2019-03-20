// Initialize FireBase
var config = {
    apiKey: "AIzaSyBKqkMVa0QS3JkHRafB8bxPOvdxZi1lTXw",
    authDomain: "fork-398d2.firebaseapp.com",
    databaseURL: "https://fork-398d2.firebaseio.com",
    projectId: "fork-398d2",
    storageBucket: "fork-398d2.appspot.com",
    messagingSenderId: "662653960380"
};
firebase.initializeApp(config);

var database = firebase.database();


// On-Click //
$("#add-train-btn").on("click", function () {

    //Prevent Default
    event.preventDefault();

    // Capture inputs
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Make an object
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
    }

    // Push to database
    database.ref().push(newTrain);
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTime);
    // console.log(newTrain.frequency);

    console.log("train added");

    // Clear fields
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
})

// ------ UPDATE DOM -------- //

// Take Snapshot
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    // ------- TRAIN MATH START ------- ///

    // What time is it now?
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Make a converted time so that we can make sure it's before current time
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Difference between the train time and current time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // ------- TRAIN MATH END ------ //

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(tMinutesTillTrain),
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);

})







