import User from '../models/user-serialize.mjs';
import express from 'express';
import { verifyUser } from '../passportconfig.mjs';

const router = express.Router();


// const app = restify.createServer({
//     name: 'User-Auth-Service',
//     version: '0.0.1'
// });
//
// app.listen(4000, 'localhost', () => {
//     console.log(`${app.name} listening on ${app.url}`);
// });
//
// app.use(restify.plugins.authorizationParser())
// app.use(authorize)
// app.use(restify.plugins.queryParser())
// app.use(restify.plugins.bodyParser({
//     mapParams: true
// }))

// retrive all users information.
router.get('/users', verifyUser, async (req, resp, next) => {
    let users = await User.list();
    resp.send(users);
});

// retrive user information.
router.get('/user/:username', verifyUser, async (req, resp, next) => {
    let user = await User.get(req.params.username);
    resp.send(user);
});

// Create users.
router.post('/user', async (req, resp, next) => {
    console.log('req body');
    console.log(req.body);
    let user = await User.create(req.body);
    resp.send(user);
});

// Modiy users.
router.put('/user/:username', verifyUser, async (req, resp, next) => {
    let username = req.params.username;
    let user = await User.get(username);

    req.body.username = username;

    if (user) {
        user = await User.update(req.body);
    } else {
        user = await User.create(req.body);
    }

    resp.send(user);
});

// delete particular user.
router.delete('/user/:username', verifyUser, async (req, resp, next) => {
    let user = await User.get(req.params.username);
    if (!user) {
        resp.send(`No such user ${req.params.username}`);
    } else {
        resp.send(await User.delete(req.params.username));
    }
});

// validate signin
router.post('/user/check/:username', async (req, resp, next) => {
    let username = req.params.username;
    let user = await User.get(username);

    if (!user) {
        resp.send(`Invalid username/password!`);
    } else {
        if (await User.check(username, req.body.password)) {
            resp.send(user);
        } else {
            resp.send(`Invalid username/password!`);
        }
    }
});

export default router; // ES6
// user - create, delete, update