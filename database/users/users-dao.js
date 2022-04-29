import userModel from './users-model.js'

const findAllUsers = () => {
  return userModel.find().select({ password: 0 })
}

const findUserById = (id) => {
  return userModel.findById(id).select({ password: 0 })
}

const findUserByUsername = (username) => {
  return userModel.findOne({ username }).select({ password: 0 })
}

const findUserByCredentials = (username, password) => {
  return userModel.findOne({ username, password })
}

const createUser = (user) => {
  return userModel.create(user)
}

const grantCreatorRole = (id) => {
  return userModel.updateOne(
    { _id: id },
    {
      $set: {
        role: 'creator'
      }
    }).select({ password: 0 })
}

const grantAdminRole = (id) => {
  return userModel.updateOne(
    { _id: id },
    {
      $set: {
        role: 'admin'
      }
    }).select({ password: 0 })
}

const updateUser = (id, user) => {
  return userModel.updateOne(
    { _id: id },
    { $set: user }
  ).select({ password: 0 })
}

const likeParody = (userId, parodyId) => {
  return userModel.updateOne(
    { _id: userId },
    {
      $push: {
        likes: parodyId
      }
    }).select({ password: 0 })
}

const dislikeParody = (userId, parodyId) => {
  return userModel.updateOne(
    { _id: userId },
    {
      $pull: {
        likes: parodyId
      }
    }).select({ password: 0 })
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
  grantCreatorRole,
  grantAdminRole,
  updateUser,
  likeParody,
  dislikeParody,
  deleteUser
}
