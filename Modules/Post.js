import mongoose from 'mongoose'
const { Schema } = mongoose

//User module for mongoose
const User = new Schema({
  title: { type: String, required: true },
  summeryParagraph: { type: String },
  fullArtical: { type: String },
  dateOfPost: { type: String },
  comments: [{ type: String }]
}, {
  timestamps: true
})

export default mongoose.model('Posts', User)
