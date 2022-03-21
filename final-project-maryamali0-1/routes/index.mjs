import express from 'express'

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('index', { title: 'Burger Bar', user: req.user });
});

export default router;
