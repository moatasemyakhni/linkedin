const express = require('express');
require('dotenv').config();
require('./config/db.config');

const app = express();
app.use(express.json());


const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.error(err);
        return;
    }

    console.log(`Server Started`);
});