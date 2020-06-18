exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const employees = [
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
    },
    {
      //id: 4
      username: 'Allison Huntington-Beech',
      jobTitle_name: 'VP of Sales'
    },
    {
      //id: 5
      username: 'John Checkers',
      jobTitle_name: 'VP of Finance'
    },
    {
      //id: 6
      username: 'Ankur Malleswari',
      jobTitle_name: 'CTO'
    },
    {
      //id: 7
      username: 'Ricardo Rocatti',
      jobTitle_name: 'Business Director'
    },
    {
      //id: 8
      username: 'Jennifer Kerry-Seleck',
      jobTitle_name: 'Commercial Leader'
    },
    {
      //id: 9
      username: 'Karsten Swashbuck',
      jobTitle_name: 'Commercial Lead'
    },
    {
      //id: 10
      username: 'Jock Mickey',
      jobTitle_name: 'Operations Lead'
    },
    {
      //id: 1
      username: 'Gary Xi',
      jobTitle_name: 'Commercial Intern'
    },
  ];

  return knex("employees")
    .insert(employees)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};