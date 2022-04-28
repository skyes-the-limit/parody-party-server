import usersDao from '../database/users/users-dao.js'

const AUTH_API_BASE = '/api/auth'

const authController = (app) => {
  app.post(`${AUTH_API_BASE}/signup`, signup)
  app.post(`${AUTH_API_BASE}/profile`, profile)
  app.post(`${AUTH_API_BASE}/signin`, login)
  app.post(`${AUTH_API_BASE}/logout`, logout)
}

const signup = async (req, res) => {
  const credentials = req.body
  const existingUser = await usersDao.findUserByUsername(credentials.username)
  if (existingUser) {
    return res.sendStatus(403)
  } else {
    const newUser = await usersDao.createUser(credentials)
    req.session.profile = newUser
    res.json(newUser)
  }
}

const login = async (req, res) => {
  const credentials = req.body
  const profile = await usersDao.findUserByCredentials(credentials.username, credentials.password)
  if (profile) {
    req.session.profile = profile
    return
  }
  res.sendStatus(403)
}

const profile = (req, res) => {
  const profile = req.session.profile
  if (profile) {
    res.json(profile)
  } else {
    res.sendStatus(503)
  }
}

const logout = (req, res) => {
  req.session.destroy()
  res.sendStatus(200)
}

export default authController
