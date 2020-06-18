const supertest = require('supertest')
const db = require('../data/dbConfig.js')

const server = require('./employeesRouter')

const sampleArray = [
     {
       //id: 1
       username: 'Saul Greenburg',
       jobTitle_name: 'CEO'
     },
     {
       //id: 2
       username: 'Thad Scheister',
       jobTitle_name: 'CFO'
     },
     {
       //id: 3
       username: 'Chuck Johnson',
       jobTitle_name: 'Controller'
     }
]

const newEmployee = {
     username: 'Hosea Kiefer',
     jobTitle_name: 'Commercial Intern'
}

it('should use the testing environment for employeesRouter', () => {
     expect(process.env.DB_ENV).toBe('testing')
})

describe('employeesRouter.js', () => {
     afterEach(async () => {
          await db('employees').truncate()

          await db('employees').insert(sampleArray)           
     })
     describe('GET from "/api/employees', () => {
          it('should return status 200', () => {
               return supertest(server)
                    .get('/')
                    .then(res => {
                         expect(res.status).toBe(200)
                    })
          })
          it('should have 11 employees', () => {
               return supertest(server)
               .get('/')
               .then(res => {
                    expect(res.body).toHaveLength(3)
               })
          })
     })

     describe('POST to "api/employees', () => {
          it('should give us a 201 status', () => {
               return supertest(server)
                    .post('/')
                    .send(newEmployee)
                    .then(res => {
                         expect(res.status).toBe(201)
                         expect(res.body).toEqual({
                                  id: 4,
                                  username: 'Hosea Kiefer',
                                  jobTitle_name: "Commercial Intern"
                         })
                    })
          })
          it('should add a new employee', async () => {
               await supertest(server)
                    .post('/')
                    .send(newEmployee)

               let updatedEmployeeList = await supertest(server)
                    .get('/')
                    expect(updatedEmployeeList.body).toHaveLength(4)
                    expect(updatedEmployeeList.body).toEqual([
                         {
                              id: 1,
                              username: 'Saul Greenburg',
                              jobTitle_name: 'CEO'
                         },
                         {
                              id: 2,
                              username: 'Thad Scheister',
                              jobTitle_name: 'CFO'
                         },
                         {
                              id: 3,
                              username: 'Chuck Johnson',
                              jobTitle_name: 'Controller'
                         },
                         {
                              id: 4,
                              username: 'Hosea Kiefer',
                              jobTitle_name: "Commercial Intern"
                         }
                    ])
          })
     })

     describe('DELETE from "api/employees/:id', () => {
          it('should give us a 200 status and show us which employee was deleted', () => {
               return supertest(server)
                    .delete('/3')
                    .then(res => {
                         expect(res.status).toBe(200)
                         expect(res.body).toEqual({
                              message: "Successfully Deleted",
                              removedEmployee: {
                                  id: 3,
                                  username: "Chuck Johnson",
                                  jobTitle_name: "Controller"
                              }
                          })
                    })
          })
          it('should reduce the list to 2 employees', async () => {
               await supertest(server)
                    .delete('/3')

               let updatedEmployeeList = await supertest(server)
                    .get('/')
                    expect(updatedEmployeeList.body).toHaveLength(2)
          })
     })
})