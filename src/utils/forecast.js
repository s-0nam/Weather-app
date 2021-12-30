const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=638ff7be6bafe17969e543090f8e42bf&query=' + latitude + ',' + longitude 
     
    request( {url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to web services', undefined)
         } else if (body.error) {
            callback('Invalid input', undefined)
         } else {
             console.log(body)
            const temperature =  body.current.temperature
            const feelslike =  body.current.feelslike
            const weather_description =  body.current.weather_descriptions[0]
            callback(undefined, weather_description + '. It is currently '+ temperature + ' degrees out. It feels like ' + feelslike + ' degrees out. The wind speed is ' + body.current.wind_speed)
        }
    })
}

module.exports = forecast