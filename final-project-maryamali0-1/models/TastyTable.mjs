class TastyTable {
    #key;
    #patty;
    #extra_patties;
    #cheese;
    #pickles;
    #special_request;
    #name;
    #email;
    #phone_number;

    constructor(key, patty, extra_patties, cheese, pickles, special_request, name, email, phone_number) {
        this.#key = key;
        this.#patty = patty;
        this.#extra_patties = extra_patties;
        this.#cheese = cheese;
        this.#pickles = pickles;
        this.#special_request = special_request;
        this.#name = name;
        this.#email = email;
        this.#phone_number = phone_number;
    }

    get key() {
        return this.#key;
    }

    get patty() {
        return this.#patty;
    }

    set patty(patty) {
        this.#patty = patty;
    }

    get extra_patties() {
        return this.#extra_patties;
    }

    set extra_patties(extra_patties) {
        this.#extra_patties = extra_patties;
    }

    get cheese() {
        return this.#cheese;
    }

    set cheese(cheese) {
        this.#cheese = cheese;
    }

    get pickles() {
        return this.#pickles;
    }

    set pickles(pickles) {
        this.#pickles = pickles;
    }

    get special_request() {
        return this.#special_request;
    }

    set special_request(special_request) {
        this.#special_request = special_request;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get email() {
        return this.#email;
    }

    set email(email) {
        this.#email = email;
    }

    get phone_number() {
        return this.#phone_number;
    }

    set phone_number(phone_number) {
        this.#phone_number = phone_number;
    }

}

class AbstractTastyTableStore {
    async create(key, patty, extra_patties, cheese, pickles, special_request, name, email, phone_number) {
    }

    async update(key, patty, extra_patties, cheese, pickles, special_request, name, email, phone_number) {
    }

    async read(key) {
    }

    async destroy(key) {
    }

    async keyList() {
    }

    async count() {
    }
}

export {TastyTable, AbstractTastyTableStore}