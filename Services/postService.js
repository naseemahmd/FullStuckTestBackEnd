import Post from '../Modules/Post.js'
import Comment from '../Modules/Comment.js'
import moment from 'moment'
import { createPostValidate } from './validations/postValidations.js'

//GET ALL POSTS
export const getAllPosts = async() => {
    try {
        let result = []

        //Getiing all
        const posts = await Post.find()

        //Loop  to get user
        for (const post of posts) {

            if (post.comments && post.comments.length > 0) {

                const users = []
                    //Commnet user
                for (const commnet of post.comments) {
                    const postCommnet = await Comment.findById(commnet)
                        //Check the user
                    if (post._id.valueOf() === postCommnet.postRef) {
                        users.push(result.user)
                    }
                }
                result.push({...post._doc, users: users })
            } else {
                result.push({...post._doc, users: null })
            }
        }
        // Desendinf Order
        result = result.sort((a, b) =>
            (new Date(a.createdAt) > new Date(b.createdAt)) ?
            -1 :
            ((new Date(a.createdAt) > new Date(b.createdAt)) ?
                1 :
                0))

        return { responce: result, error: null }
    } catch (error) {
        return { responce: null, error: error }
    }
}

//Create Post
export const createPost = async(args) => {
    try {
        // Validations
        const { error } = await createPostValidate(args)

        if (!error) {
            //Formet Date
            let date = moment(args.dateOfPost).format("DD MMM YYYY")

            //Create Model
            const post = new Post({
                title: args.title,
                summeryParagraph: args.summeryParagraph,
                fullArtical: args.fullArtical,
                dateOfPost: date
            })

            const result = await post.save()

            return { responce: result, error: null }
        } else {
            return { responce: null, error: error }
        }
    } catch (error) {
        return { responce: null, error: error }
    }
}

export const deletePost = async(args) => {
    try {
        const result = await Post.findByIdAndRemove(args.id)

        if (result.comments.length > 0) {
            for (const comment of result.comments.length) {
                await Comment.findByIdAndRemove(comment)
            }
        }
        return { responce: result, error: null }
    } catch (error) {
        return { responce: null, error: error }
    }
}