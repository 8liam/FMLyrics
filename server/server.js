const express = require('express');
const app = express();
const routes = require('./routes/index');
const cors = require('cors')

app.use(cors()) // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the routes defined in routes/index.js
app.use('/', routes);

// Start the server
const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
