/// globals ///
var dashboardData = {
    history: [],
    historyLength: 10,
    addCity: function (city) {
        if (dashboardData.history.includes(city)) {
            this.reorderCity(city);
        }
        else if (this.history.length < this.historyLength) {
            this.history = [city].concat(this.history);
        } else {
            this.history.pop();
            this.history = [city].concat(this.history);
        }
    },
    reorderCity: function (city) {
        this.history = [city].concat(this.history.filter(x => x !== city));
    },
    units: "imperial",
    forcastLength: 5
};

/// elements ///
var searchSectionEl = $("#searchSection");
var searchFormEl = $("#searchForm");
var searchInputEl = $("#searchInput");
var searchHistoryEl = $("#searchHistory");
var weatherSectionEl = $("#weatherSection");

/// utilities ///
var getResponseJson = function (response) {
    if (response.ok) {
        return response.json();
    }
    else {
        throw new Error("Weather API call response error");
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

var getUvClass = function (uvi) {
    if (uvi < 3) {
        return "bg-success";
    }
    else if (uvi < 6) {
        return "bg-warning";
    }
    else {
        return "bg-danger";
    }
};

var extractCityLocation = function (cityData) {
    return {
        lat: cityData[0].lat,
        lon: cityData[0].lon,
    }
};

var extractDayWeather = function (day) {
    return {
        date: dateString(day.dt),
        icon: day.weather[0].icon,
        iconAlt: day.weather[0].description,
        temperature: (day.temp.day || day.temp),
        humidity: day.humidity,
        windspeed: day.wind_speed,
        uvi: day.uvi
    };
};

var getWeatherData = async function (city) {
    try {
        // get city latitute/longitude for weather lookup
        var cityRequest = fetch(cityUrl(city))
            .catch(function (error) {
                throw new Error("Potential Network Error");
            });
        var cityData = await cityRequest.then(getResponseJson);
        if (cityData.length === 0) {
            throw new Error("Unable to find City");
        }
        var locationData = extractCityLocation(cityData);
        // get weather data
        var weatherRequest = fetch(weatherUrl(locationData.lat, locationData.lon))
            .catch(function (error) {
                throw new Error("Potential Network Error");
            });
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
        throw error;
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