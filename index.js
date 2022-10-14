const express = require('express');
require('./config/db.config');
require('dotenv').config();

const app = express();
app.use(express.json());


app.listen(process.env.PORT, (err) => {
    if(err) {
        console.error(err);
        return;
    }

    console.log(`Server Started`);
});