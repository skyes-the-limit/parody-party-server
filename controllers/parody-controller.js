import parodyDao from '../database/parody/parody-dao.js'

const PARODY_API_BASE = '/api/parody'

const parodyController = (app) => {
  app.get(PARODY_API_BASE, findAllParodies)
  app.get(`${PARODY_API_BASE}/:id`, findParodyById)
  app.get(`${PARODY_API_BASE}/author/:author`, findParodyByAuthor)
  app.get(`${PARODY_API_BASE}/original/:originalGeniusID`, findParodyByOriginal)
  app.post(PARODY_API_BASE, createParody)
  app.put(PARODY_API_BASE, updateParody)
  app.delete(`${PARODY_API_BASE}/:id`, deleteParody)
}

const findAllParodies = async (req, res) => {
  const parodies = await parodyDao.findAllParodies()
  res.json(parodies)
}

const findParodyById = async (req, res) => {
  const parodyId = req.params.id
  const parody = await parodyDao.findParodyById(parodyId)
  if (parody) {
    res.json(parody)
  } else {
    res.sendStatus(404)
  }
}

const findParodyByAuthor = async (req, res) => {
  const author = req.params.author
  const parodies = await parodyDao.findParodyByAuthor(author)
  if (parodies) {
    res.json(parodies)
  } else {
    res.sendStatus(404)
  }
}

const findParodyByOriginal = async (req, res) => {
  const originalGeniusID = req.params.originalGeniusID
  const parodies = await parodyDao.findParodyByOriginal(originalGeniusID)
  if (parodies) {
    res.json(parodies)
  } else {
    res.sendStatus(404)
  }
}

const createParody = async (req, res) => {
  const parody = req.body
  const insertedParody = await parodyDao.createParody(parody)
  res.json(insertedParody)
}

const updateParody = async (req, res) => {
  const newParody = req.body
  console.log(newParody)
  const parodyId = newParody._id
  const status = await parodyDao.updateParody(parodyId, newParody)
  res.json(status)
}

const deleteParody = async (req, res) => {
  const parodyId = req.params.id
  const status = await parodyDao.deleteParody(parodyId)
  res.json(status)
}

export default parodyController
