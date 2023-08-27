require('dotenv').config();

const express = require('express');
const app = express();

// Set up CORS headers
const cors = require('cors');
app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = [
            'http://localhost:4200',
            'http://www.alexgrz.vercel.app',
            'https://www.alexgrz.vercel.app',
            'https://alexgrz.vercel.app',
        ];
        
        // Affichez l'origine pour déboguer
        console.log("Received origin:", origin);
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`${origin} not allowed by CORS`));
        }
    },
    credentials: true
}));

app.use(require('./logger'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(cors({
//     origin: '*',
//     credentials: true
// }));

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