const express = require('express');
require('dotenv').config();
require('./config/db.config');

const app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors())

const userRoutes = require('./routes/user.routes');
const companyRoutes = require('./routes/company.routes');
const postRoutes = require('./routes/post.routes');

app.use('/users', userRoutes);
app.use('/companies', companyRoutes);
app.use('/posts', postRoutes);
app.listen(process.env.PORT, (err) => {
    if(err) {
        console.error(err);
        return;
    }

    console.log(`Server Started`);
});