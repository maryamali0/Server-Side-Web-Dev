import request from 'supertest';
import server from '../app.mjs';

it('should be able to access the index route', done => {
    request(server).get('/').expect(200, done);
});