import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SpotifyPlaylist from './playlist';

/**
 * COMPONENT
 */
export const SpotifyUser = (props) => {
  const {userId, name, email, spotifyId, followers} = props

  return (
    <div>
      <div className = "spotify-user-profile">
        <h2 className = "spotify-welcome-tag">Hello, {name}</h2>
        <div className = "spotify-user-info">
          <p>Email: {email}</p>
          <p>Followers: {followers} </p>
          <p>Spotify Id: {spotifyId}</p>
        </div>
      </div>
      <div className = "spotify-playlist">
        <SpotifyPlaylist userId = {userId}/>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    spotifyId: state.user.spotifyId,
    userId: state.user.id,
    name: state.user.name,
    email: state.user.email,
    followers: state.user.followers,
  }
}



export default connect(mapState)(SpotifyUser)

/**
 * PROP TYPES
 */
SpotifyUser.propTypes = {
  name: PropTypes.string
}


