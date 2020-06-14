const express = require('express');
const dotenv = require('dotenv');

// route files
const travels = require('./routes/travels');

dotenv.config({ path: './config/config.env' });

const app = express();

// mount routers
app.use('/travels', travels);

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`));