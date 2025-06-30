// In-memory user data
let users = [
    {id:1, name: "John Smith"},
    {id: 2, name: "Peter"}
]

exports.allUsers = () => users

exports.addUser = (newUser) =>{
    users.push(newUser)
    return newUser;
}

exports.findUserById = (userId) =>{
    return users.find(user => user.id == userId)
}

exports.updateUserById = (userId, editedUser) => {
    users = users.filter(user => user.id != userId)
    users.push(editedUser)
    return editedUser;
}

exports.deleteUserById = (userId) =>{
    users = users.filter(user => user.id != userId)
}
