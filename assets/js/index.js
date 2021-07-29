import { getSMHIWeatherData } from "./data.js";

let djupvikLat = 57.3081;
let djupvikLon = 18.1489;
let weatherDiv;

function main() {
    window.removeEventListener("load", main);
    weatherDiv = document.querySelector("#weather");
    fetchDjupvikWeatherData();
}

// async function fetchDjupvikWeatherData() {
//     // Fetch Djupvik weather-data from SMHI API.
//     getSMHIWeatherData(djupvikLat, djupvikLon).then((weatherData) => {
//         // console.dir(weatherData);
//         let currentDate = getCurrentDate();
//         // console.dir(currentDate);
//         let data = getCurrentData(weatherData, currentDate);
//         console.dir(data);
//         let temperature = getTemperatureCelsius(data);
//         // console.dir(temperature);
//         populateWeatherPage(temperature);
//     });
// }

async function fetchDjupvikWeatherData() {
    // Fetch Djupvik weather-data from SMHI API.
    let weatherData = await getSMHIWeatherData(djupvikLat, djupvikLon);
    console.dir(weatherData);
    let currentDate = getCurrentDate();
    console.dir(currentDate);
    let data = getCurrentData(weatherData, currentDate);
    console.dir(data);
    let temperature = getTemperatureCelsius(data);
    console.dir(temperature);
    populateWeatherPage(temperature);
}

// async function fetchDjupvikWeatherData() {
//     // Fetch Djupvik weather-data from SMHI API.
//     getSMHIWeatherData(djupvikLat, djupvikLon)
//         .then((weatherData) => {
//             let currentDate = getCurrentDate();
//             return getCurrentData(weatherData, currentDate);
//         })
//         .then((data) => {
//             console.dir(data);
//             let temperature = getTemperatureCelsius(data);
//             populateWeatherPage(temperature);
//         });
// }

function getCurrentDate() {
    return new Date();
}

function getCurrentData(weatherData, currentDate) {
    let date;
    for (let i = 0; i < weatherData.length; i++) {
        const weatherHourData = weatherData[i];
        date = new Date(weatherHourData.validTime);
        // Check if weatherHourData is data for the current day and next hour.
        if (
            date.getDate() == currentDate.getDate() &&
            date.getHours() == currentDate.getHours() + 1
        ) {
            return weatherHourData;
        }
    }
}

function getTemperatureCelsius(weatherDataHour) {
    // Extract only the temperature in Celcius from a data object.
    for (let i = 0; i < weatherDataHour.parameters.length; i++) {
        const parameter = weatherDataHour.parameters[i];
        if (parameter.name == "t") {
            return parameter.values[0];
        }        
    }
}

function populateWeatherPage(temperature) {
    // Add temperature report to the website.
    let weatherText = document.createElement("p");
    weatherText.innerHTML = `I Djupvikshamn är det under nästkommande timme ${temperature} grader varmt.`;
    weatherDiv.appendChild(weatherText);
}

// Run main when website has loaded.
window.addEventListener("load", main);
