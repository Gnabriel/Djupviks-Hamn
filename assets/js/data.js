export function getSMHIWeatherData(latitude, longitude) {
    return fetch(
        `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Extract relevant data.
            return data.timeSeries;
        });
}
