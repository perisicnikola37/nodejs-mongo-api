const request = require('supertest');
const app = require('../app');

describe('User API endpoints', () => {
    test('GET /api/v1/users should return all users', async () => {
        const response = await request(app).get('/api/v1/users');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
    });

    test('POST /api/v1/users should create a new user', async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send({ name: 'John Doe', email: 'johndoe@example.com' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.name).toBe('John Doe');
        expect(response.body.user.email).toBe('johndoe@example.com');
    });
});
