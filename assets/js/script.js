/// globals ///
var dashboardData = {
    history: [],
    units: "imperial",
    forcastLength: 5
};

// elements
var searchSectionEl = $("#searchSection");
var searchFormEl = $("#searchSection");
var searchHistoryEl = $("#searchSection");
var weatherSectionEl = $("#watherSection");

// api stuff

// https://openweathermap.org/city/5367815 -> DevTools -> Network
var apiKey = "9de243494c0b295cca9337e1e96b00e2"
var cityUrl = function (city) {
    return "https://api.openweathermap.org/geo/1.0/direct?" +
        "q=" + city +
        "&limit=1" +
        "&appid=" + apiKey;
};

var weatherUrl = function (lat, lon) {
    return "https://api.openweathermap.org/data/2.5/onecall?" +
        "lat=" + lat +
        "&lon=" + lon +
        "&exclude=minutely,hourly,alerts" +
        "&appid=" + apiKey;
};

var iconUrl = function (iconId) {
    return "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
};

var uvCondition = function (uvi) {
    if (uvi < 3) {
        return "favorable";
    }
    else if (uvi < 6) {
        return "moderate";
    }
    else {
        return "severe";
    }
};

// search stuff
// city list stuff

// current weather stuff
// forecast stuff

// save+load

// main
// start