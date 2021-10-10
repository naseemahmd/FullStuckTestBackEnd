import { Router } from 'express'
import { getAllUsers, createUser } from '../Services/userService.js'
const usersRouter = Router()

//GET
usersRouter.post('/create', async (req, res, next) => {
  const createResult = await createUser(req.body)
  if (createResult.error) {
    return res.status(500).json(createResult.error)
  } else {
    return res.status(200).json(createResult.responce)
  }
})

//POST
usersRouter.get('/getAll', async (req, res, next) => {
  const allUsers = await getAllUsers()
  allUsers.responce = allUsers.responce.map((user) => {
    user.password = null
    return user
  })
  if (allUsers.error) {
    return res.status(500).json(allUsers.error)
  } else {
    return res.status(200).json(allUsers.responce)
  }
})

export default usersRouter
