import express from 'express'
//import {InMemoryTastyTableStore} from "../models/tastytable-memory.mjs";
import {MongoDBTastyTableStore} from "../models/tastytable-mongodb.mjs";
import { verifyUser } from '../passportconfig.mjs';

const router = express.Router();
let tastytable = new MongoDBTastyTableStore();

/* GET home page. */
router.get('/', verifyUser, async (req, res, next) => {
  //console.log("keys", tastytable.keyList());
  //console.log('user details', req.user);
  //console.log("whole Object", tastytable.get());
  res.render('tastytable', {
    title: 'My Orders',
    tastytableKeys: await tastytable.keyList(req.user.username)
  });
});

router.get('/add', verifyUser, (req, res, next) => {
  if (req.query.key &&
      req.query.patty &&
      req.query.extra_patties &&
      //req.query.cheese &&
      //req.query.pickles &&
      //req.query.special_request &&
      req.user.username &&
      req.query.phone_number &&
      req.query.email
  )


  {
    tastytable.create(req.query.key,
        req.query.patty,
        req.query.extra_patties,
        req.query.cheese,
        req.query.pickles,
        req.query.special_request,
        req.user.username,
        req.query.email,
        req.query.phone_number
        );
    res.redirect('/tastytable');
  }

  else {
    res.render('edit-tastytable', {
      title: 'Create TastyTable'
    });
  }
});

router.get('/edit/:key', verifyUser, async (req, resp, next) => {
  let data = await tastytable.read(req.params.key);

  if (!data) {
    next(new Error(`No such key ${req.params.key}`));
    return;
  }

  if (req.query.patty &&
      req.query.extra_patties &&
      // req.query.cheese &&
      // req.query.pickles &&
      // req.query.special_request &&
      req.query.name &&
      req.query.phone_number &&
      req.query.email)
  {
    await tastytable.update(
        req.params.key,
        req.query.patty,
        req.query.extra_patties,
        req.query.cheese,
        req.query.pickles,
        req.query.special_request,
        req.query.name,
        req.query.email,
        req.query.phone_number);
    resp.redirect('/tastytable');
  } else {
    console.log(data, "data");
    resp.render('edit-tastytable', {
      title: 'Edit Tasty Table',
      tastytable: data,
      edit: true
    });
  }
});


router.get('/delete/:key', verifyUser, async (req, resp, next) => {
  let data = await tastytable.read(req.params.key);

  if (!data) {
    next(new Error(`No such key ${req.params.key}`));
    return;
  }

  await tastytable.destroy(req.params.key);
  resp.redirect('/tastytable');
});


/*router.get('/:key', async (req, resp, next) => {
  let tastytableObject = await tastytable.read(req.params.key);

  if (!tastytableObject) {
    next(new Error(`No such key ${req.params.key}`));
    return;
  }

  resp.render('read-tastytable', {
    title: 'Read TastyTable',
    tastytable: tastytableObject,

  });

});*/

router.get('/menu', async (req, res) => {
  res.render('menu');
})

router.get('/about', async (req, res) => {
  res.render('about');
})

export default router;
