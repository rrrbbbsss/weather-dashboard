/// globals ///
var dashboardData = {
    history: [],
    units: "imperial",
    forcastLength: 5
};

/// elements ///
var el = {
    searchSection: $("#searchSection"),
    searchForm: $("#searchForm"),
    searchHistory: $("#searchHistory"),
    weatherSection: $("#weatherSection")
};

/// utilities ///
var getResponseJson = function (response) {
    if (response.ok) {
        return response.json();
    }
    else {
        // todo: throw the response errors
        console.log("response error todo");
    }
};

var dateString = function (unixtime) {
    var date = new Date(unixtime * 1000);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return month + "/" + day + "/" + year;
}

/// api stuff ///
// https://openweathermap.org/city/5367815 -> DevTools -> Network
var apiKey = "9de243494c0b295cca9337e1e96b00e2"

var cityUrl = function (city) {
    return "https://api.openweathermap.org/geo/1.0/direct?" +
        "q=" + city +
        "&limit=" + "1" +
        "&appid=" + apiKey;
};

var weatherUrl = function (lat, lon) {
    return "https://api.openweathermap.org/data/2.5/onecall?" +
        "lat=" + lat +
        "&lon=" + lon +
        "&units=" + dashboardData.units +
        "&exclude=" + "minutely,hourly,alerts" +
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

var extractCityLocation = function (city) {
    return {
        lat: city[0].lat,
        lon: city[0].lon,
    };
};
var extractDayWeather = function (day) {
    return {
        date: dateString(day.dt),
        icon: day.weather[0].icon,
        temperature: (day.temp.day || day.temp),
        humidity: day.humidity,
        windspeed: day.wind_speed,
        uvi: day.uvi,
        uvCondition: uvCondition(day.uvi),
    };
};

var getWeatherData = async function (city) {
    // todo: make distinction between network errors and bad city name errors
    // and do not save bad city names
    try {
        // get city latitute/longitude for weather lookup
        var cityRequest = fetch(cityUrl(city));
        var cityData = await cityRequest.then(getResponseJson);
        var locationData = extractCityLocation(cityData);
        // get weather data
        var weatherRequest = fetch(weatherUrl(locationData.lat, locationData.lon));
        var weatherData = await weatherRequest.then(getResponseJson);
        //current data
        var currentData = extractDayWeather(weatherData.current);
        //forcast data
        var forecastData = [];
        // offset by one to start at next day's weather
        for (var i = 1; i < dashboardData.forcastLength + 1; i++) {
            forecastData.push(extractDayWeather(weatherData.daily[i]));
        }
        return {
            city: city,
            current: currentData,
            forecast: forecastData
        };
    }
    catch (error) {
        return "there was an error somewhere";
    }
};

/// search stuff ///
/// city list stuff ///

/// current weather stuff ///
/// forecast stuff ///

/// save+load ///

/// main+start ///
var main = function () {
    console.log("todo: main function");
};

main();