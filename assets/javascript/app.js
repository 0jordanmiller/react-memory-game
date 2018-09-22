window.onload = function () {
    
var config = {
apiKey: "AIzaSyBFHB2F27xL_cGkb-KnZguU2ZubaXmrMFc",
authDomain: "homework-9903a.firebaseapp.com",
databaseURL: "https://homework-9903a.firebaseio.com",
projectId: "homework-9903a",
storageBucket: "",
messagingSenderId: "29796619773"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName;
var destination;
var frequency;
var firstTrain;

var now = moment();


$("#submit-info").on('click', function() {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrain = $("#first-train").val().trim();

    var firstTimeConverted = moment(firstTrain, 'HH:mm').subtract(1, 'years')
    console.log(firstTimeConverted);

    var diffTime = now.diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);

    var remainder = diffTime % frequency;
    console.log(remainder);

    var tMinutesTillTrain = frequency - remainder
    console.log(tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, 'minutes');
    var nextTrainHours = nextTrain.format('HH:mm');
    console.log(nextTrainHours);


    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency, 
        firstTrain: firstTrain,
        timeLeft: tMinutesTillTrain,
        nextTrain: nextTrainHours,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

})


database.ref().orderByChild('dateAdded').limitToLast(10).on("child_added", function(snapshot) {
    $("#input-here").append("<tr>").
    append("<td>" + snapshot.val().trainName).
    append("<td>" + snapshot.val().destination).
    append("<td>" + snapshot.val().frequency).
    append("<td>" + snapshot.val().nextTrain).
    append("<td>" + snapshot.val().timeLeft)
})


}