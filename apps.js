$(document).ready(function () {

    var tmAuthKey = "zOsl8qw2cJozfhalFYHMmDpGBYjFaNfr";
    var queryTerm = "";
    var city = "";
    var startDate = 0;
    var endDate = 0;


    //URL Base
    var queryURLBase = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=" + tmAuthKey;
    // var queryURL = "https://itunes.apple.com/search?term=" + queryTerm;


    function runTM(queryURL) {

        //ajax call for ticketmaster
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (TMData) {
            // console.log(TMData._embedded.events[0]._embedded.venues[0].city.name);
            //Looping though the array to append the name of the concert

            // for (var i = 0; i < TMData._embedded.events.length; i++) {
            //     console.log(TMData._embedded.events[i]._embedded.venues[0].city.name);
            // }


            for (var i = 0; i < TMData._embedded.events.length; i++) {
                console.log(TMData._embedded.events[i].url);
                
                var eventCity = TMData._embedded.events[i]._embedded.venues[0].city.name;
                var eventName = TMData._embedded.events[i].name;
                var eventDate = TMData._embedded.events[i].dates.start.localDate;
                var ticketURL = TMData._embedded.events[i].url;

                $('#tm-events').append(eventName + "<br>");
                $('#tm-events').append(eventCity + "<br>");
                $('#tm-events').append(eventDate + "<br>");
                $('#tm-events').append(ticketURL + "<br>");


            };


            
            console.log((TMData));
            console.log(queryURL);
        })

    }





    function runItunes(queryURL) {
        //ajax call for itunes
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (ITUNESData) {
            console.log("-------------------------\n\n\n")
            var response = JSON.parse(ITUNESData)
            console.log(response)
            for (let i = 0; i < 10; i++) {
                console.log(response.results[i].trackName)
                console.log(response.results[i].trackViewUrl)
                
            }
        })
    }
    //  var getSong= runItunes;
    // $(".songs").append(getSong);

    $('#submit-btn').on('click', function () {
        $('#tm-section').empty();
        //Get search term for  Ticket Master
        event.preventDefault()
        queryTerm = $("#artist-search").val().trim();
        var newURL = queryURLBase + "&keyword=" + queryTerm;
        runTM(newURL);

        var itunesUrl = "https://itunes.apple.com/search?term=" + queryTerm;

        console.log(itunesUrl);

        runItunes(itunesUrl);


    })



    //  var artist="Lady Gaga"

    //             var queryURL = "https://itunes.apple.com/search?term=" + artist;

    //         $.ajax({
    //             url: queryURL,
    //             method: "GET"
    //         }).then(function (ITUNESData) {
    //             console.log(JSON.parse(ITUNESData));
    //             var response= (JSON.parse(ITUNESData))
    //             for (let i = 0; i < 10; i++) {
    //                console.log (response.results[i].artistName)
    //                console.log (response.results[i].trackCensoredName)



    //     }
    // })


})



