import usersDao from '../database/users/users-dao.js'
import parodyDao from '../database/parody/parody-dao.js'

const AUTH_API_BASE = '/api/auth'

const authController = (app) => {
  app.post(`${AUTH_API_BASE}/signup`, signup)
  app.post(`${AUTH_API_BASE}/profile`, profile)
  app.post(`${AUTH_API_BASE}/login`, login)
  app.post(`${AUTH_API_BASE}/logout`, logout)
  app.post(`${AUTH_API_BASE}/like/:parodyId`, likeParody)
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
    res.json(profile)
  } else {
    res.sendStatus(403)
  }
}

const profile = (req, res) => {
  const profile = req.session.profile
  if (profile) {
    res.json(profile)
  } else {
    res.sendStatus(403)
  }
}

const logout = (req, res) => {
  req.session.destroy()
  res.sendStatus(200)
}

const likeParody = async (req, res) => {
  const profile = req.session.profile
  const parodyId = req.params.parodyId

  let status
  if (profile.likes.includes(parodyId)) {
    const status1 = await parodyDao.decrementParodyLikes(parodyId)
    const status2 = await usersDao.dislikeParody(profile._id, parodyId)
    status = {
      acknowledged: status1.acknowledged && status2.acknowledged,
      modifiedCount: status1.modifiedCount + status2.modifiedCount,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: status1.matchedCount + status2.matchedCount
    }
  } else {
    const status1 = await parodyDao.incrementParodyLikes(parodyId)
    const status2 = await usersDao.likeParody(profile._id, parodyId)
    status = {
      acknowledged: status1.acknowledged && status2.acknowledged,
      modifiedCount: status1.modifiedCount + status2.modifiedCount,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: status1.matchedCount + status2.matchedCount
    }
  }

  req.session.profile = await usersDao.findUserById(profile._id)
  res.json(status)
}

export default authController
