import userModel from './users-model.js'

const findAllUsers = () => {
  return userModel.find()
}

const findUserById = (id) => {
  return userModel.findById(id)
  // return userModel.find({_id: id})
}

const findUserByUsername = (username) => {
  userModel.findOne({ username })
  // userModel.findOne({username: username})
  // userModel.find({username: username})
}

const findUserByCredentials = (username, password) => {
  return userModel.findOne({ username, password })
  // userModel.findOne({username: username, password: password})
}

const createUser = (user) => {
  return userModel.create(user)
}

const updateUser = (id, user) => {
  userModel.updateOne(
    { _id: id },
    { $set: user }
    // {
    //   $set: {
    //     username: user.username,
    //     password: user.password,
    //     firstName: user.firstName,
    //     lastName: user.lastName
    //   }
    // }
  )
}

const deleteUser = (id) => {
  return userModel.deleteOne({ _id: id })
}

export default {
  findAllUsers,
  findUserById,
  findUserByUsername,
  findUserByCredentials,
  createUser,
  updateUser,
  deleteUser
}

//   {
//   findUserByCredentials: findUserByCredentials,
//   findUserById: findUserById,
//   findAllUsers: findAllUsers,
//   findUserByUsername: findUserByUsername,
//   createUser: createUser,
//   deleteUser: deleteUser,
//   updateUser: updateUser
// }
