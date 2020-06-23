const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const checkIfAuthenticated = require('./middleware/firebase-auth');

dotenv.config({ path: './config/config.env' });

// route files
const travels = require('./routes/travels');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser({limit: '50mb'}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// mount routers
app.use('/travels', checkIfAuthenticated, travels);
app.use('/auth', checkIfAuthenticated, auth);

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`));