const app = require('../app');
const request = require('supertest');
const port = process.env.PORT || 3000;

describe('User API endpoints', () => {
    test('Should return all users', async () => {
        const response = await request(`http://localhost:${port}`)
            .get('/api/v1/users');

        expect(response.status).toBe(200);

        if (response.body.length === 0) {
            // Expect an empty array if no users are returned
            expect(response.body).toEqual([]);
        } else {
            // Expect an array containing user objects if users are returned
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        username: expect.any(String),
                        email: expect.any(String),
                        description: expect.any(String),
                    }),
                ])
            );
        }
    });
});
