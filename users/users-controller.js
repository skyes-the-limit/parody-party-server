import usersDao from '../database/users/users-dao'

const userController = (app) => {
  app.get('/api/users', findAllUsers)
  app.get('/api/users/:id', findUserById)
  app.get('/api/users/username/:username', findUserByUsername)
  app.post('/api/users/credentials', findUserByCredentials)
  app.post('/api/users', createUser)
  app.put('/api/users/creator/:id', grantCreatorRole)
  app.put('/api/users/admin/:id', grantAdminRole)
  app.put('/api/users/:id', updateUser)
  app.delete('/api/users/:id', deleteUser)
}

const findAllUsers = async (req, res) => {
  const users = await usersDao.findAllUsers()
  res.json(users)
}

const findUserById = async (req, res) => {
  const userId = req.params.id
  const user = await usersDao.findUserById(userId)
  if (user) {
    res.json(user)
  } else {
    res.sendStatus(404)
  }
}

const findUserByUsername = async (req, res) => {
  const username = req.params.username
  const user = await usersDao.findUserByUsername(username)
  if (user) {
    res.json(user)
  } else {
    res.sendStatus(404)
  }
}

const findUserByCredentials = async (req, res) => {
  const credentials = req.body
  const { username, password } = credentials
  const user = await usersDao.findUserByCredentials(
    username, password
  )
  if (user) {
    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }
}

const createUser = async (req, res) => {
  const user = req.body
  const insertedUser = await usersDao.createUser(user)
  res.json(insertedUser)
}

const updateUser = async (req, res) => {
  const user = req.body
  const userId = req.params.id
  const status = await usersDao.updateUser(userId, user)
  res.json(status)
}

const grantCreatorRole = async (req, res) => {
  const userId = req.params.id
  const status = await usersDao.grantCreatorRole(userId)
  res.json(status)
}

const grantAdminRole = async (req, res) => {
  const userId = req.params.id
  const status = await usersDao.grantAdminRole(userId)
  res.json(status)
}

const deleteUser = async (req, res) => {
  const userId = req.params.id
  const status = await usersDao.deleteUser(userId)
  res.json(status)
}

export default userController
