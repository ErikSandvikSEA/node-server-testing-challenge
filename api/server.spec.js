const supertest = require('supertest')
const db = require('../data/dbConfig.js')

const server = require('./server.js')

it('should use the testing environment', () => {
     expect(process.env.DB_ENV).toBe('testing')
})