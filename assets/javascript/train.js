$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyBLCXUuPqyHbFdfm0JN4USAUYkK0rIWfc0",
        authDomain: "eric-train-schedule.firebaseapp.com",
        databaseURL: "https://eric-train-schedule.firebaseio.com",
        projectId: "eric-train-schedule",
        storageBucket: "",
        messagingSenderId: "650586554837"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency = 0;

    

    $("#submit-btn").on("click", function(event) {

        event.preventDefault();

        trainName = $("#input-train").val().trim();
        destination = $("#input-destination").val().trim();
        firstTrainTime = $("#input-first-train").val().trim();
        frequency = $("#input-frequency").val().trim();
        //firstTrainTime = moment(militaryTrainTime, "HH:mm").format('hh:mm a');

            database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

    database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {

    	var timeConverted = moment(childSnapshot.val().firstTrainTime, "hh:mm a");
        var currentTime = moment();

        console.log ("Current Time: " + moment(currentTime).format("hh:mm a"));

        var difTime = moment().diff(moment(timeConverted), "minutes")

        console.log("Difference In Time " + difTime);

        var remainder = difTime % childSnapshot.val().frequency;

        console.log(remainder);

        var minAway = childSnapshot.val().frequency - remainder;

        console.log(minAway);

        var nextArrival = moment().add(minAway, "minutes");

        console.log(moment(nextArrival).format("hh:mm a"));

    	//console.log(moment(childSnapshot.val().firstTrainTime, "hh:mm a").diff(moment().format("hh:mm a")));


        $("#train-info").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + moment(nextArrival).format("hh:mm a") + "</td><td>" + minAway + "</td></tr>");



    });




});