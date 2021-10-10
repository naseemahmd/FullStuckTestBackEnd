import Comment from '../Modules/Comment.js'
import User from '../Modules/User.js'
import Post from '../Modules/Post.js'
import { createCommnetValidate } from './validations/commentValidate.js'

//GET ALL COMMENTS 
export const getAllComments = async () => {
  try {
    const comments = await Comment.find()

    return { responce: comments, error: null }
  } catch (error) {
    return { responce: null, error: error }
  }
}

//CREATE Commnet 
export const createComment = async (args) => {
  try {
    //Validation Check
    const { error } = await createCommnetValidate(args)

    if (!error) {
      //GET COMMENT USER

      const user = await User.findById(args.userID)

      if(!user){
        return { responce: null, error: "NO USER" }
      }

      //Model Create
      const commnet = new Comment({
        comment: args.comment,
        dateTime: args.dateTime,
        email: args.email,
        user: user,
        postRef: args.postRef
      })

      const result = await commnet.save()

      // Comment Post and Update
      await Post.findByIdAndUpdate({ _id: args.postRef },
        { $push: { comments: result._id } },
        { new: true })

      return { responce: result, error: null }
    } else {
      return { responce: null, error: error }
    }
  } catch (error) {
    return { responce: null, error: error }
  }
}
