require('dotenv').config();

const express = require('express');
const app = express();

app.use(require('./logger'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS headers
const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: true
}));

// Connect to MongoDB using mongoose
const mongoose = require('mongoose');
const config = require('./config');
const port = process.env.PORT || 3000;
let dbConnection = null;

// Function to establish or return existing MongoDB connection
function connectToMongo() {
    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    if (!dbConnection || dbConnection.readyState !== 1) {
        console.log('No db init > mongoose connect');
        mongoose.connect(`${config.mongoURI}`, connectionOptions);
        dbConnection = mongoose.connection; // Store the connection
        return dbConnection;
    } else {
        console.log('db already init');
        return dbConnection;
    }
}

const router = express.Router({ mergeParams: true });
const apiRouter = require('./router')(router);

// Use const for db variable
dbConnection = connectToMongo();

dbConnection.once('open', () => {
    console.log('Connected to MongoDB');
    app.use('/v1', apiRouter);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
});

dbConnection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = app;
