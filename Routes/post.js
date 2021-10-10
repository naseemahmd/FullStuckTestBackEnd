import { Router } from 'express'
import { getAllPosts, createPost, deletePost } from '../Services/postService.js'
const postRouter = Router()

// GET
postRouter.get('/getAll', async(req, res, next) => {
    const allPost = await getAllPosts()

    if (allPost.error) {
        return res.status(500).json(allPost.error)
    } else {
        return res.status(200).json(allPost.responce)
    }
})

//POST
postRouter.post('/create', async(req, res, next) => {
    const createResult = await createPost(req.body)
    if (createResult.error) {
        return res.status(500).json(createResult.error)
    } else {
        return res.status(200).json(createResult.responce)
    }
})

//POST
postRouter.post('/delete/:id', async(req, res, next) => {
    const deleteResult = await deletePost(req.params)
    if (deleteResult.error) {
        return res.status(500).json(deleteResult.error)
    } else {
        return res.status(200).json(deleteResult.responce)
    }
})

export default postRouter