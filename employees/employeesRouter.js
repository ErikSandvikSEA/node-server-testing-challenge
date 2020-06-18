const express = require('express')
const Employees = require('./employeesModel.js')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
     Employees.get()
          .then(employeesList => {
               res.status(200).json(employeesList)
          })
          .catch(error => {
               res.status(500).json(error);
             });
})

module.exports = server