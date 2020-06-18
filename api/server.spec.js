const supertest = require('supertest')
const db = require('../data/dbConfig.js')

const server = require('./server.js')

it('should use the testing environment', () => {
     expect(process.env.DB_ENV).toBe('testing')
})

describe('server.js', () => {
    describe(`Get '/'`, () => {
         it('should return status 200', () => {
              return supertest(server)
                    .get('/')
                    .then(res => {
                         expect(res.status).toBe(200)
                    })
         })

         it('should return JSON', () => {
               return supertest(server)
                    .get('/')
                    .then(res => {
                         expect(res.type).toMatch(/json/i)
                    })
         })

         it('should give us the server: "Up and Running" message', () => {
              return supertest(server)
                    .get('/')
                    .then(res => {
                         expect(res.body.server).toBe('Up and Running')
                    })
         })

         it('should give us the entire object back on the res.body', () => {
              return supertest(server)
                    .get('/')
                    .then(res => {
                         expect(res.body).toEqual({ server: 'Up and Running' })
                    })
         })
    })
})