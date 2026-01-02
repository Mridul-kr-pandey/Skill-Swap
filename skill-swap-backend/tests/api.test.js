const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const SkillListing = require('../models/SkillListing');
const SkillRequest = require('../models/SkillRequest');

let authToken;
let testUser;
let testListing;
let testRequest;

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGODB_URI_TEST);

  // Create test user
  testUser = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  });

  // Login to get auth token
  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });

  authToken = loginResponse.body.token;
});

afterAll(async () => {
  // Clean up test data
  await User.deleteMany({});
  await SkillListing.deleteMany({});
  await SkillRequest.deleteMany({});
  await mongoose.connection.close();
});

describe('Skill Listing API', () => {
  test('should create a new skill listing', async () => {
    const response = await request(app)
      .post('/api/listings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Listing',
        description: 'Test Description',
        skills: ['JavaScript', 'React'],
        location: 'Test Location',
        availability: 'flexible'
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Listing');
    testListing = response.body;
  });

  test('should get all listings with filters', async () => {
    const response = await request(app)
      .get('/api/listings')
      .query({
        search: 'Test',
        skills: 'JavaScript',
        location: 'Test Location',
        page: 1,
        limit: 10
      });

    expect(response.status).toBe(200);
    expect(response.body.listings).toBeInstanceOf(Array);
    expect(response.body.pagination).toBeDefined();
  });

  test('should update a listing', async () => {
    const response = await request(app)
      .put(`/api/listings/${testListing._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Updated Test Listing',
        description: 'Updated Description',
        skills: ['JavaScript', 'React', 'Node.js'],
        location: 'Updated Location',
        availability: 'weekends'
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Test Listing');
  });
});

describe('Skill Request API', () => {
  test('should send a new request', async () => {
    const response = await request(app)
      .post('/api/requests')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        toUser: testUser._id,
        listingId: testListing._id,
        message: 'Test request message'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Test request message');
    testRequest = response.body;
  });

  test('should get my received requests', async () => {
    const response = await request(app)
      .get('/api/requests')
      .set('Authorization', `Bearer ${authToken}`)
      .query({
        status: 'pending',
        page: 1,
        limit: 10
      });

    expect(response.status).toBe(200);
    expect(response.body.requests).toBeInstanceOf(Array);
    expect(response.body.pagination).toBeDefined();
  });

  test('should respond to a request', async () => {
    const response = await request(app)
      .patch(`/api/requests/${testRequest._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        status: 'accepted'
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('accepted');
  });
}); 