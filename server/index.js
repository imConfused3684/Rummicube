'use strict';
const express = require('express');
const cors = require('cors');
const config = require('./config');
const userRoutes = require('./routes/user-routes');

const app = express();

app.use(cors());
app.use(express.json()); // This is enough for parsing JSON

app.use('/api', userRoutes.routes);

app.listen(config.port, () => {
  console.log(`App is listening on http://localhost:${config.port}`);
});
