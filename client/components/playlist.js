import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import{fetchTrack, fetchPlaylists, deleteSpotifySong} from '../store';
import ReactAudioPlayer from 'react-audio-player';


class SpotifyPlaylist extends Component{

    componentDidMount() {
        this.props.getSongs(this.props.userId)
    }
    render(){
        const {userId, accessToken, spotifySubmit, spotifyPlaylist, deleteSong} = this.props;
        console.log("FROOM FONT_END PLAYLIST", spotifyPlaylist)
        return (
            <div>
                <div className = "alpha-playlist">
                    <h3>Create a New Playlist</h3>
                    <form className = "alpha-playlist-form" onSubmit = {(event) => {
                        event.preventDefault(); 

                        spotifySubmit(userId, 
                        event.target.songName.value  ? event.target.songName.value : "asdasdasd", 
                        event.target.artistName.value ? event.target.artistName.value : "asdasdasd", 
                        accessToken)

                        }}>
                        
                        <label>Song Name:</label>
                        <input type = "text" name="songName" placeholder ="Enter Song Name" />
                        
                        <label>Artist Name:</label>
                        <input type = "text" name="artistName" placeholder ="Enter Artist Name"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                {
                    spotifyPlaylist[0] && spotifyPlaylist.map(function(song) {
                        return(
                            <div key = {song.id} className="alpha-playlist-live">
                                <div className="alpha-item">
                                    <h3>{song.name} - {song.artistName}</h3>
                                    <img src ={song.imageUrl} />
                                    <button className = "alpha-audio-button"><ReactAudioPlayer src = {song.previewUrl} autoplay controls></ReactAudioPlayer></button>
                                    <button onClick={() => deleteSong(userId, song.id)} type="submit" className ="alpha-delete">Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        spotifyPlaylist: state.playlist,
        accessToken: state.user.accessToken,
        userId: state.user.id
    }
  }

  const mapDispatch = (dispatch) => {
      return{
            spotifySubmit: (userId, songName, songArtist, accessToken) => {
                dispatch(fetchTrack(userId, songName, songArtist, accessToken))
            },

            getSongs: (userId) => {
                dispatch(fetchPlaylists(userId));
            },
            
            deleteSong: (userId, songId) => {
                dispatch(deleteSpotifySong(userId, songId))
            }
    }
  }
  export default connect(mapState, mapDispatch)(SpotifyPlaylist)
  
  /**
   * PROP TYPES
   */
  SpotifyPlaylist.propTypes = {
    name: PropTypes.string
  }
  
  