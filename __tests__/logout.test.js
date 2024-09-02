import supertest from 'supertest';
import { app } from '../index.js';
import mongoose from 'mongoose';

let server;

beforeAll(async () => {
    server = app.listen(process.env.TEST_PORT || 3002);
    console.log(`Test server listening on port ${process.env.TEST_PORT || 3002}`);
});

afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
    await mongoose.disconnect(); // Veritabanı bağlantısını kapat
});


describe("User", () => {
    describe("Logout", () => {
        it("should return 200 for valid logout details", async () => {

            const response = await supertest(server)
                .post('/users/logout')
                .send();

            expect(response.status).toBe(200);
        })
    })
})