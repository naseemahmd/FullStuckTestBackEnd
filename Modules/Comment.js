import mongoose from 'mongoose'
const { Schema } = mongoose

// Commnet Model for Mongoose
const Comment = new Schema({
  user: {
    type: Schema.Types.Object,
    ref: 'User'
  },
  postRef: { type: String, required: true },
  comment: { type: String, required: true },
  dateTime: { type: String, required: true },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true
})

export default mongoose.model('Comments', Comment)
