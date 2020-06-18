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

//DELETE employee by id
server.delete('/:id', validateEmployeeId, (req, res) => {
     const employeeId = req.params.id
     Employees.remove(employeeId)
          .then(removedEmployee => {
               res.status(200).json({
                    message: 'Successfully Deleted',
                    removedEmployee: removedEmployee
               })
          })
          .catch(err => {
               res.status(500).json({
                    message: 'Error occured while deleting',
                    error: err
               })
          })
})



function validateEmployeeId(req, res, next) {
     const urlId = req.params.id
     Employees.findById(urlId)
          .then(employee => {
               if(employee){
                    req.employee = employee
                    next()
               } else {
                    res.status(404).json({
                         message: 'Employee ID not found, sry'
                    })
               }
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({
                    error: err,
                    message: 'Error retrieving the Employee'
               })
          })
}

module.exports = server