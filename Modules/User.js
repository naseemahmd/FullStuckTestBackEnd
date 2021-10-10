import mongoose from 'mongoose'
const { Schema } = mongoose

//User Model for mogoose
const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  profilePic: { type: String },
  isOnline: { type: Boolean, default:true }
}, {
  timestamps: true
})

export default mongoose.model('Users', User)
