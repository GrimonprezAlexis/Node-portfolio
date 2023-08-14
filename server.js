const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CommonService = require('./app/helpers/common.service');

const app = express();
const port = process.env.PORT || 3000;

// Set up CORS headers
app.use(cors({
    origin: function(origin, callback) {
        const allowOrigin = [
            'http://localhost:4200',
            'http://www.alexgrz.vercel.app',
            'https://www.alexgrz.vercel.app'
        ];
        const originIsAllowOrigined = allowOrigin.indexOf(origin) !== -1;
        callback(null, originIsAllowOrigined);
    },
    credentials: true
}));

// Middleware for logging
app.use(require('./middleware/logger'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using mongoose
mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;


db.on('error', CommonService.handleDBError);

db.once('open', () => {
    console.log('Connected to MongoDB');

    // Define API routes
    app.use('/v1', require('./app/routes/v1/router'));

    // Start the server after connecting to DB
    app.listen(port, () => console.log(`Server is running on port ${port}`));
});
