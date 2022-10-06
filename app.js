const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index');
});

const artistRouter = require('./controllers/artistController');
app.use('/artist', artistRouter);

const albumRouter = require('./controllers/albumController');
app.use('/album', albumRouter);

const ratingRouter = require('./controllers/ratingController');
app.use('/rating', ratingRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
