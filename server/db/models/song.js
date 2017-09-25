const Sequelize = require('sequelize');
const db = require('../db');

const Song = db.define('song', {
    name: {
        type: Sequelize.STRING
    },
    artistName: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    previewUrl: {
        type: Sequelize.STRING
    }
})

module.exports = Song;

