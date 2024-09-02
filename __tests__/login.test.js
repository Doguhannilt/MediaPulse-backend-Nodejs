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

describe('User', () => {
    describe('Login', () => {
        describe('Wrong credentials', () => {
            it('should return 400 for incorrect login details', async () => {
                const wrong_parameters = {
                    email: 'wrong_email',
                    password: 'wrong_password',
                };

                const response = await supertest(server)
                    .post('/users/login')
                    .send(wrong_parameters);

                expect(response.status).toBe(400);
            });
        });

        describe('Correct credentials', () => {
            it('should return 201 for valid login details', async () => {
                const true_parameters = {
                    email: 'testestestest@example.com',
                    password: 'password',
                };

                const response = await supertest(server)
                    .post('/users/login')
                    .send(true_parameters);

                expect(response.status).toBe(200);
            });
        });

        describe("User doesn't exist", () => {
            it('should return 404 for user that does not exist', async () => {
                const parameters = {
                    email: "whoishe?@gmail.com",
                    password: "password",
                };

                const response = await supertest(server)
                    .post('/users/login')
                    .send(parameters);

                expect(response.status).toBe(400);
                })
        });

        describe("Password is incorrect", () => {
            it('should return 400 for incorrect password', async () => {
                const parameters = {
                    email: "testestestest@example.com",
                    password: "wrongpassword",
                };

                const response = await supertest(server)
                    .post('/users/login')   
                    .send(parameters);
            
                expect(response.status).toBe(400);
            
            });
        });
    });
});
