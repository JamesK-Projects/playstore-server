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

        if('rating'.includes(sort)){
            console.log('sort by rating')

        }

        if('app'.includes(sort)){
            console.log('sort by app')
        }
    };

    if(genre) {
        if([!'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card');
        }
    }

    res
        .json(results);

});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});