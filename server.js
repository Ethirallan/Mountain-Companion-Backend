const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const checkIfAuthenticated = require('./middleware/firebase-auth');

// route files
const travels = require('./routes/travels');
const auth = require('./routes/auth');
const stops = require('./routes/stops');
const travelImages = require('./routes/travelImages');
const weather = require('./routes/weather');
const mountainPeaks = require('./routes/mountainPeaks');
const mountainLog = require('./routes/mountainLog');

const app = express();

app.use(bodyParser({limit: '50mb'}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// mount routers
app.use('/travels', checkIfAuthenticated, travels);
app.use('/auth', checkIfAuthenticated, auth);
app.use('/stops', checkIfAuthenticated, stops);
app.use('/travel-images', checkIfAuthenticated, travelImages);
app.use('/weather', weather);
app.use('/mountain-peaks', mountainPeaks);
app.use('/mountain-logs', checkIfAuthenticated, mountainLog);

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`));