import express, {Express, NextFunction, Request, Response} from 'express';
import session from "express-session";
import passport from 'passport';
import routes from './routes';
import './config/passport';
import cors from 'cors';


const pg = require('pg');
const app = express();
const PORT = 8080;

// Allow requests from http://localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

// Use the CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

app.use(
    session({
        secret: 'secretKey',
        resave: false,
        saveUninitialized: false,
    })
)

app.use(passport.initialize());
app.use(passport.session());


app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});