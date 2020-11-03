const express = require('express');
const morgan = require('morgan');
const playstoreApps = require('./playstore-data');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const { sort, genre } = req.query;

    let results = playstoreApps
    
    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app');
        };

        if(sort.includes('rating')){
            results.sort((a,b) => {
                return b.Rating - a.Rating
            })

        }
        if(sort.includes('app')){
            results.sort((a,b) => {
                return a.App > b.App ? 1 : a.App < b.App ? -1 : 0;
            })
        }

        if('app'.includes(sort)){
            console.log('sort by app')
        }
    };

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card');
        }
        results = results.filter((result) => {
            return result.Genres.includes(genre)
        })
    }

    res
        .json(results);

});

module.exports = app;