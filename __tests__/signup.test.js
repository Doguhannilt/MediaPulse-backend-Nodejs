import supertest from 'supertest';
import { app } from '../index.js';
import mongoose from 'mongoose';

let server;

beforeAll(async () => {
    server = app.listen(process.env.TEST_PORT || 3001);
    console.log(`Test server listening on port ${process.env.TEST_PORT || 3001}`);
});

afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
    await mongoose.disconnect(); // Veritabanı bağlantısını kapat
});

describe('User', () => {
    describe('Signup', () => {
        describe('Wrong credentials', () => {
            it('should return 400 for incorrect signup details', async () => {
                const wrong_parameters = {
                    email: 'wrong_email',
                    password: 'wrong_password',
                    username: 'wrong_username'
                };

                const response = await supertest(server)
                    .post('/users/signup')
                    .send(wrong_parameters);

                expect(response.status).toBe(400);
            });
        });

        describe('Correct credentials', () => {
            it('should return 201 for valid signup details', async () => {
                const true_parameters = {
                    email: 'your_example@example.com',
                    password: 'your_password',
                    username: 'your_username',
                    name: 'your_username'
                };

                const response = await supertest(server)
                    .post('/users/signup')
                    .send(true_parameters);

                expect(response.status).toBe(201);
            });
        });
    });
});
