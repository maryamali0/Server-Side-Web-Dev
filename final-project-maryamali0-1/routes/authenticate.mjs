import express from 'express';
import passport from 'passport';
import { getJWtToken, verifyUser } from '../passportconfig.mjs';
import User from '../models/user-serialize.mjs';

const router = express.Router();

router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post(passport.authenticate('local', { failureRedirect: '/login', session: false }), (req, res) => {
        const token = getJWtToken({ username: req.user.username });
        res.cookie('JWT', token);
        res.redirect('/tastytable');
});

router.route('/register')
    .get((req, res, next) => {
        res.render('register');
    })
    .post(async (req, res, next) => {
        console.log(req.body);
        const newUser = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };
        try {
            await User.create(newUser);
            res.redirect('/login');
        } catch(err) {
            res.render('/register');
        }
    });

router.get('/logout', (req, res) => {
    res.clearCookie('JWT');
    res.redirect('/');
})
export default router;