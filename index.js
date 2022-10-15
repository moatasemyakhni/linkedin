const express = require('express');
require('dotenv').config();
require('./config/db.config');

const app = express();
app.use(express.json());


const userRoutes = require('./routes/user.routes');
const companyRoutes = require('./routes/company.routes');
app.use('/users', userRoutes);
app.use('/companies', companyRoutes);
app.listen(process.env.PORT, (err) => {
    if(err) {
        console.error(err);
        return;
    }

    console.log(`Server Started`);
});