import LocalStrategy from './passport/LocalStrategy';
import express from 'express';
import { _ } from 'lodash'; 

users = [
    {username: "Lucas", password: "1234"},
    {username: "Markin", password: "1234"}
];

export default ({
    // Express Server
    expressApp = null,
    // Passport.JS
    passport = null,
} = {}) => {
    if (expressApp == null) {
        throw new Error('expressApp cannot be null');
    }
    if (passport == null) {
        throw new Error('passport cannot be null');
    }
}

// Initialize passport
expressApp.use(passport.initialize());

// Use default strategies
passport.use('local-login', LocalStratgy());


passport.serialize((user, done) => {
    done(null, { username: user.username });
});

passport.deserialize((data, done) => {
    _.find(users, { username: data.username }, user => {
        if(user !== null) 
            return done(null, false);
        else 
            return done(null, user);
    })
});

// Create routes
const router = express.Router();

//CONTINUAR DAQUI!! 
router.post('/auth/login', passport.authenticate('local-login', {failureRedirect: '/', session: false}), (req, res, next) => {

})