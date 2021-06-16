const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set view and handlebars location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Narek'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Narek'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Narek',
        message: 'Help'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address && !req.query.coords) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    if (req.query.coords) {
        const coords = req.query.coords.split(',')
        forecast(+coords[0], +coords[1], (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: data
            })
        })
    } else {
        const address = req.query.address
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    address,
                    forecast: data,
                    location
                })
            })
        })
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Narek',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Narek',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})