import parodyModel from './parody-model.js'
import userModel from '../users/users-model.js'

const findAllParodies = () => {
  return parodyModel.find().sort({ likes: -1 })
}

const findVerifiedParodies = () => {
  return userModel.aggregate([{
    $match: {
      role: 'creator'
    }
  }, {
    $lookup: {
      from: 'parodies',
      localField: 'username',
      foreignField: 'author',
      as: 'parodies'
    }
  }])
}

const findParodyById = (id) => {
  return parodyModel.findById(id)
}

const findParodyByAuthor = (author) => {
  return parodyModel.find({ author }).sort({ likes: -1 })
}

const findParodyByOriginal = (originalGeniusID) => {
  return parodyModel.find({ originalGeniusID }).sort({ likes: -1 })
}

const createParody = (parody) => {
  return parodyModel.create(parody)
}

const updateParody = (id, parody) => {
  return parodyModel.updateOne(
    { _id: id },
    { $set: parody }
  )
}

const incrementParodyLikes = (id) => {
  return parodyModel.updateOne(
    { _id: id },
    { $inc: { likes: 1 } }
  )
}

const decrementParodyLikes = (id) => {
  return parodyModel.updateOne(
    { _id: id },
    { $inc: { likes: -1 } }
  )
}

const deleteParody = (id) => {
  return parodyModel.deleteOne({ _id: id })
}

export default {
  findAllParodies,
  findVerifiedParodies,
  findParodyById,
  findParodyByAuthor,
  findParodyByOriginal,
  createParody,
  updateParody,
  incrementParodyLikes,
  decrementParodyLikes,
  deleteParody
}
