require('dotenv').config();

const express = require('express');
const app = express();

app.use(require('./logger'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS headers
const cors = require('cors');
app.use(cors({
    origin: function(origin, callback) {
        const allowOrigin = [
            'http://localhost:4200',
            'http://www.alexgrz.vercel.app',
            'https://www.alexgrz.vercel.app',
            'https://alexgrz.vercel.app',
        ];
        if(allowOrigin.indexOf(origin) !== -1) {
            return callback(null, originIsAllowOrigined);
        } else {
            console.log("CORS error");
            let err = new Error('Not allowed by CORS')
            .status(405);
            next(err);
        };
    },
    credentials: true
}));

// Connect to MongoDB using mongoose
const mongoose = require('mongoose');
const config = require('./config');
const port = process.env.PORT || 3000;
mongoose.connect(`${config.mongoURI}?tls=true&tlsInsecure=true`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const router = express.Router({mergeParams: true});
const apiRouter = require('./router')(router);

db.once('open', () => {
    console.log('Connected to MongoDB');
    app.use('/v1', apiRouter);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = app;