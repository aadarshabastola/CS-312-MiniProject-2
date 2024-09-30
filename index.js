const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get('/', (req, res) => {
    const categories = ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];
    res.render('index', { joke: null, categories });
});

const categories = ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];

// Joke API
app.post('/get-joke', async (req, res) => {
    const category = req.body.category || 'Any'; // Get category from form, default to 'Any'
    try {
      const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,political,racist,sexist,explicit`);
      res.render('index', { joke: response.data, categories });
    } catch (error) {
      res.send('Error fetching joke');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});