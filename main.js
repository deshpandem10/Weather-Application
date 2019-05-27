$(function () {

    let searchButton = document.getElementById('searchCityBtn');
    let searchInput = document.getElementById('inputCity');
    let temperature = document.getElementById("tempDisplay");
    let humidity = document.getElementById('humidityDisplay');
    let pressure = document.getElementById('pressureDisplay');
    let wind = document.getElementById('windDisplay');

    const key = "adcbaf2ac33077b45b05846355cc474f";

    searchButton.addEventListener("click", getWeatherDetails);
    searchInput.addEventListener("keyup", enterPressed);

    function enterPressed(event) {
        if (event.key == "Enter") {
            getWeatherDetails();
        }
        else {
        }
    }

    function getWeatherDetails() {
        if (searchInput.value == "") {
            alert ('Please enter City name');
        }else {
            let url = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+key;
            console.log(url);
            httpRequestAsync(url, urlResponse);
        }
    }

    function urlResponse(response) {
        let jsonObject = JSON.parse(response);
        temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + " C";
        humidity.innerHTML = parseFloat(jsonObject.main.humidity);
        pressure.innerHTML = parseFloat(jsonObject.main.pressure);
        wind.innerHTML = parseFloat(jsonObject.wind.speed);
        icon_holder.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    }

    function httpRequestAsync(url, callback){
        let httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => { 
            if (httpRequest.readyState == 4 && httpRequest.status == 200)
                callback(httpRequest.responseText);
        }
        httpRequest.open("GET", url, true);
        httpRequest.send();
    }
});