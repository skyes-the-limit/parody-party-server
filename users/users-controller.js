import usersDao from '../database/users/users-dao.js'

const userController = (app) => {
  app.get('/api/users', findAllUsers)
  app.get('/api/users/:id', findUserById)
  app.get('/api/users/username/:username', findUserByUsername)
  app.post('/api/users/credentials', findUserByCredentials)
  app.post('/api/users', createUser)
  app.put('/api/users/creator', grantCreatorRole)
  app.put('/api/users/admin', grantAdminRole)
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
  try {
    const user = await usersDao.findUserByUsername(username)
    if (user) {
      res.json(user)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

const findUserByCredentials = async (req, res) => {
  const credentials = req.body
  const { username, password } = credentials
  try {
    const user = await usersDao.findUserByCredentials(
      username, password
    )
    // TODO: Delete user password before returning json

    if (user) {
      res.json(user)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

// TODO: Ensure "username already in use" case is properly handled
const createUser = async (req, res) => {
  try {
    const user = req.body
    const insertedUser = await usersDao.createUser(user)
    // TODO: Delete user password before returning json
    res.json(insertedUser)
  } catch (err) {
    console.error(err)
    // TODO: Handle "username already in use" case gracefully
    res.sendStatus(500)
  }
}

const updateUser = async (req, res) => {
  try {
    const user = req.body
    const userId = req.params.id
    const status = await usersDao.updateUser(userId, user)
    res.json(status)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

const grantCreatorRole = async (req, res) => {
  try {
    const username = req.params.username
    const status = await usersDao.grantCreatorRole(username)
    res.json(status)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

const grantAdminRole = async (req, res) => {
  try {
    const username = req.params.username
    const status = await usersDao.grantAdminRole(username)
    res.json(status)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    const status = await usersDao.deleteUser(userId)
    res.json(status)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export default userController
