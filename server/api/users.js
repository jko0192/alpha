const router = require('express').Router()
const {User, Song} = require('../db/models');
const axios = require('axios');
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id','email', 'name', 'followers']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  User.findAll({
    where: {id: req.params.userId}
  })
  .then(user => user[0].getSongs())
  .then(songs => res.json(songs))
  .catch(next);
})


router.post('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const songName = req.body.name;
  const songArtist = req.body.artistName;
  const accessToken = req.body.accessToken;
  axios({
    method: 'get',
    url: `https://api.spotify.com/v1/search/?q=track:${songName}%20artist:${songArtist}&type=track`,
    headers: {'Authorization': 'Bearer ' + accessToken}
  }).
  then(res => res.data)
  .then(songPackage => {
    return Song.findOrCreate({
      where:{
      name: songPackage.tracks.items[0].name,
      artistName: songPackage.tracks.items[0].artists[0].name,
      imageUrl: songPackage.tracks.items[0].album.images[0].url,
      previewUrl: songPackage.tracks.items[0].preview_url,
      userId: userId
      }
    }).spread((song, created) => song)
  })
  .then(spotifySong => res.json(spotifySong))
  .catch(next)
})

router.delete('/:userId', (req, res, next) => {
  return Song.destroy({
    where: {id: parseInt(req.body.songId)}
  })
  .then(() => {
    return User.findAll({where: {id: req.params.userId}})
  })
  .then(user => user[0].getSongs())
  .then(songs => res.json(songs))
  .catch(next);
})
