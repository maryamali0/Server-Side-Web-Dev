class VisitorCounter {

    #visits;
    constructor() {
        this.#visits = [];
    }

    addVisit () {
        this.#visits.push(1);
    }

    getCount () {
        return this.#visits.length;
    }

}

export {VisitorCounter}