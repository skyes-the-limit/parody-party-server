import mongoose from 'mongoose'

const usersSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'creator', 'admin'], default: 'user', required: true },
    displayName: { type: String },
    likes: { type: Array },
    requestedVerification: { type: Boolean, default: false }
  },
  {
    collection: 'users'
  }
)

export default usersSchema
