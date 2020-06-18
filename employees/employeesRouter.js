const express = require('express')
const Employees = require('./employeesModel.js')
const server = express()

const { requiredProperty } = require('../api/middleware.js')

server.use(express.json())

//GET list of employees
server.get('/', (req, res) => {
     Employees.get()
          .then(employeesList => {
               res.status(200).json(employeesList)
          })
          .catch(error => {
               res.status(500).json(error);
             });
})

//POST new employee
server.post('/',
     requiredProperty('username'), 
     requiredProperty('jobTitle_name'), 
     (req, res) => {
          const newEmployee = req.body
          Employees.insert(newEmployee)
               .then(addedNewEmployee => {
                    res.status(201).json(addedNewEmployee)
               })
               .catch(err => {
                    res.status(500).json({
                         message: 'Error occurred while posting',
                         error: err
                    })
               })
})

module.exports = server