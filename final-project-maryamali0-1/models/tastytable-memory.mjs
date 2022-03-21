import {TastyTable, AbstractTastyTableStore} from "./TastyTable.mjs";

let tastytable = {}


class InMemoryTastyTableStore extends AbstractTastyTableStore {

    async create(key, patty, extra_patties, cheese, pickles, special_request, name, email, phone_number) {
        tastytable[key] = new TastyTable(
            key,
            patty,
            extra_patties,
            cheese,
            pickles,
            special_request,
            name,
            email,
            phone_number);
        return tastytable[key]
    }

    async update(key, patty, extra_patties, cheese, pickles, special_request, name, email, phone_number,) {
        if (tastytable.hasOwnProperty(key)) {
            tastytable[key] = new TastyTable(
                key,
                patty,
                extra_patties,
                cheese,
                pickles,
                special_request,
                name,
                email,
                phone_number);
        } else {
            throw new Error(`No such key: ${key}`);
        }
    }

    async read(key) {
        console.log(key, tastytable.toString(), "all data")
        return tastytable[key]
    }
    async get(){
        return tastytable;
    }

    async destroy(key) {
        if (tastytable.hasOwnProperty(key)) {
            delete tastytable[key];
        } else {
            throw new Error(`No such key: ${key}`);
        }
    }

    async keyList() {
        return Object.keys(tastytable);
    }

    async count() {
        return Object.keys(tastytable).length;
    }
}

export {InMemoryTastyTableStore}