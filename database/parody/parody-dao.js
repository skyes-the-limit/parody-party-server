import parodyModel from './parody-model.js'

const findAllParodies = () => {
  return parodyModel.find().sort({ likes: -1 })
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

const updateParodyLyrics = (id, lyrics) => {
  return parodyModel.updateOne(
    { _id: id },
    { $set: { lyrics } }
  )
}

const deleteParody = (id) => {
  return parodyModel.deleteOne({ _id: id })
}

export default {
  findAllParodies,
  findParodyById,
  findParodyByAuthor,
  findParodyByOriginal,
  createParody,
  updateParodyLyrics,
  deleteParody
}
