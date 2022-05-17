const { default: axios } = require("axios");
const { router } = require("./src/app.js");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
//const Character = require("./src/models/Character.js");
const {Episode, Character} = require("./src/db")

// Syncing all the models at once.
router.get('/episodes', async (req, res) => {
  const characterInfo = await axios.get('https://rickandmortyapi.com/api/character')
  const infoApi = await characterInfo.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      species: el.species,
      image: el.image,
      origin: el.origin.name,
      created: el.created

    }
  })
  res.status(200).send(infoApi);
})
router.get('/episodes', async (req, res) => {
  const episodeInfo = await axios.get('https://rickandmortyapi.com/api/episode')
  const episode = await episodeInfo.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name
    }
  })
  await Episode.bulkCreate(episode);
  res.status(200).sen(episode)
})

router.post('/characters', (req, res, next) => {
  const { id, name, species, image, origin, created } = req.body;
  try {
      const characterCreated = await Character.create({
      id,
      name, 
      species,
      image,
      origin,
      created,
      episode
    })
    for (let i=0; i<episode.length; i++) {
      const episodio = await Episode.findOne({
        where: {
          name: episode[i]
        }
      })
      characterCreated.addEpisode(episodio)
    
      res.send('Personaje creado')
    }
  } catch (error) {
    next(error)
  }
  
})
// Para la precarga cuando se levanta el server, ejecutar la funcion getEpisodes(). Al ser una peticion vamos a usar async await.

conn.sync({ force: true }).then(() => {
  getEpisodes();
  server.listen(3001, () => {
    console.log("Listening at 3001"); // eslint-disable-line no-console
  });
});

module.exports = router;