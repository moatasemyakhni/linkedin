const express = require('express');

const app = express();

app.use(express.json());


app.listen(3000, (err) => {
    if(err) {
        console.error(err);
        return;
    }

    console.log(`Server Started on port 3000`);
});