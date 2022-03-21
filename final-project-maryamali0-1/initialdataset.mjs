// Load users
import User from './models/user-serialize.mjs';
import {MongoDBTastyTableStore} from "./models/tastytable-mongodb.mjs";
let tastytable = new MongoDBTastyTableStore();

const initializeDataset = async () => {
    
    // Creating the user.
    const existingUser = await User.get('johndoe');
    if (!existingUser) {
        User.create({ username: 'johndoe', firstName: 'john', lastName: 'doe', password: '12345' });
    }

    // creating order.
    const existingOrder = await tastytable.count();
    if (!existingOrder) {
        tastytable.create('order1',
            'garlic chicken',
            '2',
            "cheese",
            "pickles",
            'Add more spicy',
            'John doe',
            'johndoe@gmail.com',
            '9876543210'
            );
    }

}

export default initializeDataset;