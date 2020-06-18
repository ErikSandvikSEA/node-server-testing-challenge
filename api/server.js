const express = require('express')
const employeesRouter = require('../employees/employeesRouter.js')
const server = express()

server.use(express.json())

//tester for up n running
server.get('/', (req, res) => {
     res.status(200).json({
          server: 'Up and Running'
     })
})

server.use('/api/employees', employeesRouter)

module.exports = server