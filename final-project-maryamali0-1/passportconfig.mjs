import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import User from './models/user-serialize.mjs';
const SECRET_KEY = "1234567890";

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['JWT'];
    return token;
  };

export const initialiseStrategy = () => {

    const authenticateUser = async (username, password, done) => {
        console.log('local login requested');
        try {
            const user = await User.check(username, password);
            if (user) {
                console.log('matching user');
                console.log(JSON.stringify(user));
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err) {
            done(err, false)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    
};

export const initializeJwtStrategy = () => {
    const options = {};
    options.jwtFromRequest = cookieExtractor; //ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey= SECRET_KEY;
    options.usernameField = 'username';

    console.log('jwt token');
    console.log(options);
    const authenticateJwtUser = async (jwtPayload, done) => {
        console.log('jwt payload', jwtPayload);
        try {
            const user = await User.get(jwtPayload.username);
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch(err) {
            done(err, false)
        }
    }
    passport.use('jwt', new JwtStrategy(options, authenticateJwtUser))
}

export const getJWtToken = (user) => jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

export const verifyUser = passport.authenticate('jwt', { failureRedirect: '/login', session: false });