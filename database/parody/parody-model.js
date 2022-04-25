import mongoose from 'mongoose'
import parodySchema from './parody-schema.js'

const parodyModel = mongoose.model('ParodyModel', parodySchema)

export default parodyModel
