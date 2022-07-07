const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const main_routes = require('./Routes/main_routes');

/**
 * CORS Functionality of express implementation
 **/

app.use(cors());
require("dotenv").config();
// app.use(express.bodyParser({limit: '50mb'}));

/**
 * Body Parser URL ENCODED used for multipart enctype formdata
 */
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use('/uploads', express.static('uploads'));
/**
 * PARSING json requests
 */
app.use(bodyParser.json({limit: '50mb'}));
app.use(main_routes);

mongoose.connect('mongodb://127.0.0.1:27017/films', {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Database Connected !');
        /**
         * RUN only when DB is connected
         */
        app.listen(3000, () => {
            console.log("Server is listening at PORT 3000");
        })
    })
    .catch((error) => {
        console.log('Error at DB Connection !', error.message);
        process.exit();
    });