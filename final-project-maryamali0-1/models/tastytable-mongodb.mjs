import {TastyTable, AbstractTastyTableStore} from './TastyTable.mjs';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

const db = await (async () => {
    let client = await MongoClient.connect('mongodb://localhost:27017/');
    return client.db('burger-bash');
})();

const catering = db.collection('catering');

class MongoDBTastyTableStore extends AbstractTastyTableStore {
    async create(key, patty, extra_patties, cheese, pickles, special_request, name, email, phone_number) {
        await catering.insertOne({
            key: key,
            patty: patty,
            extra_patties: extra_patties,
            cheese: cheese,
            pickles: pickles,
            special_request: special_request,
            name: name,
            email: email,
            phone_number: phone_number,
        })

        return new TastyTable(key, patty, extra_patties, cheese, pickles, special_request, name, email, phone_number );
    }

    async update(key, patty, extra_patties, cheese, pickles, special_request, name, email, phone_number) {
        await catering.updateOne({key: key}, {
            $set: {
                patty: patty,
                extra_patties: extra_patties,
                cheese: cheese,
                pickles: pickles,
                special_request: special_request,
                name: name,
                email: email,
                phone_number: phone_number
            }
        })

        return new TastyTable(key, patty, extra_patties, cheese, pickles, special_request, name, email, phone_number);
    }

    async read (key) {
        return await catering.findOne({key: key});        
    }
    async readAll () {
        return await catering.find({}).toArray();
    }
    async destroy (key) {
        let doc = await catering.findOne({key: key});
        if (!doc) {
            throw new Error(`No order found for ${key}`);
        }

        return await catering.findOneAndDelete({key: key});
    }

    async keyList(username) {
        return await catering.find({ name: username }).map(tastytable => tastytable.key).toArray();
    }

    async count() {
        return await catering.countDocuments();
    }
}

export {MongoDBTastyTableStore}

