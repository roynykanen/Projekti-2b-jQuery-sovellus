// Määritellään API-avain
const API_KEY = '5ef984f882cd6f33235e787b9a6f9ffc';

// Haetaan tarvittavat DOM-elementit jQueryn avulla
const search = $("#search-input");
const city = $("#city");
const forecast = $("#forecast");
const icon = $("#icon");
const description = $("#description");
const temperature = $("#temperature");
const minmax = $("#minmax");
const feels = $("#feels");
const wind = $("#wind");
const humidity = $("#humidity");
const pressure = $("#pressure");

// Käsittellään hakulomakkeen lähetys jQueryn avulla
$("#search-form").submit(function(e) {
    // Estetään lomakkeen oletustoiminta
    e.preventDefault();
    // Asetetaan haettu kaupunki muuttujaan currentCity
    currentCity = search.val().trim();
    // Kutsutaan getWeather-funktiota hakutulosten hakemiseksi
    getWeather();
    // Tyhjennetään hakukenttä
    search.val("");
});

// Käsitellään suurennuslasin kuvakkeen klikkaus jQueryn avulla
$('#glass').click(function(e) {
    // Estetään lomakkeen oletustoiminta
    e.preventDefault();
    // Asetetaan haettu kaupunki muuttujaan currentCity
    currentCity = search.val().trim();
    // Kutsutaan getWeather-funktiota hakutulosten hakemiseksi
    getWeather();
    // Tyhjennetään hakukenttä
    search.val("");
});

// Funktio, joka hakee säätiedot valitusta kaupungista
function getWeather() {
    // Lähetetään haku OpenWeatherMap API:lle jQueryn avulla
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`,
        method: 'GET',
        success: function(data) {
            // Päivitetään HTML-elementit säätiedoilla jQueryn avulla
            city.fadeOut(200, function() {
                $(this).html(`${data.name}, ${data.sys.country}`).fadeIn(200);
            });
            forecast.fadeOut(200, function() {
                $(this).html(`<p>${data.weather[0].main}</p>`).fadeIn(200);
            });
            icon.fadeOut(200, function() {
                $(this).html(`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`)
                       .fadeIn(200);
            });
            description.fadeOut(200, function() {
                $(this).html(`${data.weather[0].description}`).fadeIn(200);
            });
            temperature.fadeOut(200, function() {
                $(this).html(`${data.main.temp.toFixed()}°C`).fadeIn(200);
            });
            minmax.fadeOut(200, function() {
                $(this).html(`<p>Min: ${data.main.temp_min.toFixed()}°C</p><p>Max: ${data.main.temp_max.toFixed()}°C</p>`)
                       .fadeIn(200);
            });
            feels.fadeOut(200, function() {
                $(this).html(`${data.main.feels_like.toFixed()}°C`).fadeIn(200);
            });
            wind.fadeOut(200, function() {
                $(this).html(`${data.wind.speed.toFixed()} m/s`).fadeIn(200);
            });
            humidity.fadeOut(200, function() {
                $(this).html(`${data.main.humidity} %`).fadeIn(200);
            });
            pressure.fadeOut(200, function() {
                $(this).html(`${data.main.pressure} hPa`).fadeIn(200);
            });

            // Varmistetaan, että #content ja #info näkyvät, jos ne eivät vielä ole näkyvissä
            $("#content").fadeIn(200);
            $("#info").fadeIn(200);
        },
        error: function(error) {
            console.error('Error fetching weather data:', error); // Tulostetaan virhe konsoliin
            alert('City not found. Please enter a valid city name.'); // Ilmoitetaan käyttäjälle virheestä
        }
    });
}