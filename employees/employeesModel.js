const database = require('../data/dbConfig.js')

module.exports = {
     insert,
     // update,
     // remove,
     get,
     findById
}

function insert(employee) {
     return database('employees')
          .insert(employee, 'id')
          .then(([id]) => {
               return findById(id)
          })
}

function get() {
     return database('employees')
}

function findById(id) {
     return database('employees').where({id}).first()
}