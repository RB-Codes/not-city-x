'use strict';
require('dotenv').config();

const express = require('express');

const cors = require('cors');


const PORT = process.env.PORT || 3030;

const app = express();

app.use(cors());

app.get('/', (request, response) => {
    response.status(200).send('you did a great job');
});


app.get('/location', (req, res) => {
    const city = req.query.data;
    console.log(city);
    const geoData = require('./data/geo.json');
    console.log(geoData);
    const locationData = new Location(city, geoData);
    res.send(locationData);
});

function Location(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}




app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.use((error, req, res) => {
    res.status(500).send(error);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
