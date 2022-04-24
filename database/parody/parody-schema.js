import mongoose from 'mongoose'

const parodySchema = mongoose.Schema(
  {
    originalGeniusID: { type: Number, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    lyrics: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: Array },
    date: { type: Date, default: Date.now }
  },
  {
    collection: 'parodies'
  }
)

export default parodySchema
