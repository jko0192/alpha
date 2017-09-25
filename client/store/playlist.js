import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_TRACK = 'GET_TRACK';
const REMOVE_TRACK = 'REMOVE_TRACK';
const RECIEVE_SONGS = 'RECIEVE_SONGS';
const REMAINING_SONGS= 'REMAINING_SONGS'

/**
 * INITIAL STATE
 */
const spotifyTrack = [];

/**
 * ACTION CREATORS
 */
const getTrack = spotifyTrack => ( {type: GET_TRACK, spotifyTrack} );
const recieveSongs = songs => ( {type: RECIEVE_SONGS, songs} );
const remainingSongs = alphaSongs => ( {type: REMAINING_SONGS, alphaSongs} );

export const fetchTrack = (userId, songName, songArtist, accessToken) => dispatch => {

    return axios.post(`api/users/${userId}`, {
      name: songName,
      artistName: songArtist,
      accessToken: accessToken
    })
    .then(res => res.data)
    .then(spotifySong =>{
      dispatch(getTrack(spotifySong))
    })
    .catch(console.log);
}

export const fetchPlaylists = (userId) => dispatch => {
  axios.get(`/api/users/${userId}`)
  .then(res => res.data)
  .then(songs => {
    dispatch(recieveSongs(songs))
  })
  .catch(console.log)
}

export const deleteSpotifySong = (userId, songId) => dispatch => {
  return axios.delete(`api/users/${userId}`, {data: {songId: songId}})
  .then(res => res.data)
  .then(songs => {
    console.log("FROM FRONT END", songs)
    dispatch(remainingSongs(songs));
  })
  .catch(console.log)
}

/**
 * REDUCER
 */
export default function (state = spotifyTrack, action) {
  switch (action.type) {
    case GET_TRACK:
       return Object.assign([], state, [...state, action.spotifyTrack])
    case RECIEVE_SONGS:
      return action.songs;
    case REMAINING_SONGS:
      return action.alphaSongs;
    default:
      return state
  }
}