// DO NOT MAKE CHANGES TO THIS FILE
// DO NOT MAKE CHANGES TO THIS FILE
// DO NOT MAKE CHANGES TO THIS FILE
const shortid = require('shortid')

// const initializeUsers = () => ([
//   { id: shortid.generate(), name: 'Ed Carter', bio: 'hero' },
//   { id: shortid.generate(), name: 'Mary Edwards', bio: 'super hero' },
// ])

// FAKE IN-MEMORY USERS "TABLE"
let users = [
  { id: shortid.generate(), name: 'Ed Carter', bio: 'hero' },
  { id: shortid.generate(), name: 'Mary Edwards', bio: 'super hero' },
]

// DATABASE ACCESS FUNCTIONS
// DATABASE ACCESS FUNCTIONS
// DATABASE ACCESS FUNCTIONS
// const find = () => {
//   // SELECT * FROM users;
//   // return Promise.resolve(users)
//   return users
// }

// const findById = id => {
//   // SELECT * FROM users WHERE id = 1;
//   const user = users.find(d => d.id === id)
//   return Promise.resolve(user)
// }

// const insert = ({ name, bio }) => {
//   // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
//   const newUser = { id: shortid.generate(), name, bio }
//   users.push(newUser)
//   return Promise.resolve(newUser)
// }

// const update = (id, changes) => {
//   // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
//   const user = users.find(user => user.id === id)
//   if (!user) return Promise.resolve(null)

//   const updatedUser = { ...changes, id }
//   users = users.map(d => (d.id === id) ? updatedUser : d)
//   return Promise.resolve(updatedUser)
// }

// const remove = id => {
//   // DELETE FROM users WHERE id = 1;
//   const user = users.find(user => user.id === id)
//   if (!user) return Promise.resolve(null)

//   users = users.filter(d => d.id !== id)
//   return Promise.resolve(user)
// }

// const resetDB = () => { // ONLY TESTS USE THIS ONE
//   users = initializeUsers()
// }

module.exports = {
  async find() {
    // SELECT * FROM users;
    // return Promise.resolve(users)
    return users
  },
 async findById(id)  {
      // SELECT * FROM users WHERE id = 1;
      const user = users.find(d => d.id === id)
      return user
    },

 async insert ({ name, bio }) {
        // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
        const newUser = { id: shortid.generate(), name, bio }
        users.push(newUser)
        return newUser
      },
 async update (id, changes) {
  // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
  const user = users.find(user => user.id === id)
  if (!user) return Promise.resolve(null)

  const updatedUser = { ...changes, id }
  users = users.map(d => (d.id === id) ? updatedUser : d)
  updatedUser
 },

 async remove(id) {
    // DELETE FROM users WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)
  
    users = users.filter(d => d.id !== id)
    return user
  }
}
