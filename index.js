
// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin:"*"
})); 


require('./route/login.route')(app);
require('./route/role.route')(app);
require('./route/menu.route')(app);
require('./route/profile.route')(app);


const PORT = 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on http://0.0.0.0:${PORT}`));
