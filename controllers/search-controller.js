import axios from 'axios'

const SEARCH_API_BASE = '/api/search'
const EXTERNAL_GENIUS_API_BASE = 'https://api.genius.com/'

const searchController = (app) => {
  app.get(`${SEARCH_API_BASE}/:query`, searchGenius)
}

// TODO: Attach popular parodies to genius results
const searchGenius = async (req, res) => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_CLIENT_ACCESS_TOKEN}`
    }
  }
  const url = `${EXTERNAL_GENIUS_API_BASE}search?q=${req.params.query}`

  try {
    const response = await axios.get(url, config)
    console.log(response.data)
    res.json(response.data.response)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export default searchController
