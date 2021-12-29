const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectorypath))
 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sonam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sonam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'How can I help you?',
        title: 'Help',
        name: 'Sonam'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode (req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })
}) 

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name:'Sonam'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Sonam'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})