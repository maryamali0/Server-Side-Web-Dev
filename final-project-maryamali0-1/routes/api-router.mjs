import express from 'express';
import {MongoDBTastyTableStore} from "../models/tastytable-mongodb.mjs";
import { verifyUser } from '../passportconfig.mjs';

const router = express.Router();
let tastytable = new MongoDBTastyTableStore();


// router.get('/orders', (req, res))
router.route('/allOrders')
    .get(verifyUser, async (req, res) => {
        const allOrders = await tastytable.readAll();
        res.jsonp({
            orders: allOrders
        });        
    });

router.get('/:orderId', verifyUser, async (req, res) => {
    console.log('fetching single order');
        const key = req.params.orderId;
        const order = await tastytable.read(key);
        console.log(order);
        res.jsonp({
            ...order
        })
    });

export default router;