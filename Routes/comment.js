import { Router } from 'express'
import { getAllComments, createComment } from '../Services/commentService.js'
const commentRouter = Router()

//GET
commentRouter.get('/getAll', async (req, res, next) => {
  const allCommnets = await getAllComments()
  if (allCommnets.error) {
    return res.status(500).json(allCommnets.error)
  } else {
    return res.status(200).json(allCommnets.responce)
  }
})

//Post
commentRouter.post('/create', async (req, res, next) => {
  const createResult = await createComment(req.body)
  if (createResult.error) {
    return res.status(500).json(createResult.error)
  } else {
    return res.status(200).json(createResult.responce)
  }
})
export default commentRouter
