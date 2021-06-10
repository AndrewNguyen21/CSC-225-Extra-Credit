$(document).ready(function (){

    //funtion occurs when submit button is clicked
    $('button').on('click', function() {

        //function only continues if a zip code has an entry
        if($('#zip').val() != '' && $('#zip').val() != null) {

            //console log to confirm zip code entry
            console.log('Zip Code has been entered');

            //console log to confirm API request
            console.log('Request to API being made');

            //sets zip code variable
            $zip = $('#zip').val();

            //makes request to API
            var request = axios.get('https://api.openweathermap.org/data/2.5/weather?zip=' + $zip + ',us&appid=a9f04f5211af4ecc89ff5929217dab44');

            //console log to confirm access to API
            console.log('Request to API granted');

            //functions runs after successful access to API
            request.then(function(response){

                $('#location').html($zip);

                //inserts condition to html
                $('#condition').html(response.data.weather[0]['main']);

                //inserts sky description to html
                $('#sky').html(response.data.weather[0]['description']);

                //inserts current temp to html, converts degrees kelvin to fahrenheit
                $('#temp-now').html(((response.data.main['temp']-273.15) * (9/5) + 32).toFixed(2) + ' °F');

                //inserts the high temp to html, converts degrees kelvin to fahrenheit
                $('#temp-high').html(((response.data.main['temp_max']-273.15) * (9/5) + 32).toFixed(2) + ' °F');

                //inserts the low temp to html, converts degrees kelvin to fahrenheit
                $('#temp-low').html(((response.data.main['temp_min']-273.15) * (9/5) + 32).toFixed(2) + ' °F');

                //inserts wind speed (in mph) and direction (in degrees) to html
                $('#wind').html(response.data.wind['speed'] + ' mph @ ' + response.data.wind['deg'] + '°');
            })

            //if axios there is an error with the request
            .catch(function (error){

                //console log to inform of error
                console.log('Error: Invalid Zip Code!');

                //error message displays
                $('body').prepend('<div class="alert alert-danger rounded-0 text-center" role="alert">Error: Zip Code Not Found!</div>');
            });
        };
    });

    //function occurs when clear form button is clicked
    $('#reset').on('click', function(){

        //console log to inform of form clearing
        console.log('Form cleared');

        //clears the weather meta
        $('#location').html('');
        $('#condition').html('');
        $('#sky').html('');
        $('#temp-now').html('');               
        $('#temp-high').html('');
        $('#temp-low').html('');
        $('#wind').html('');
    });
});
