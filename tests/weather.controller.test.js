const request = require('supertest');
const app = require('../app');
let server;
describe('Testing Weather APIS', () => {
    beforeAll((done) => {
        server = app.listen(5000, done);
    });
    afterAll((done) => {
        server.close(done);
    });
    it('should return if server is listening on port 5000', async () => {
        const response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
    });
});
