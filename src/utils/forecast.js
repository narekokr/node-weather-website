const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=057a8ffae7a64ecf6d95077464477342&query=${lat},${long}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const currentData = body.current
            callback(undefined, `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degrees out. Feels like ${currentData.feelslike} degrees`)
        }
    })
}

module.exports = forecast