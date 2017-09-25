import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {logout} from '../store';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */

const Main = (props) => {
  const {userId, children, handleClick, isLoggedIn} = props

  return (
    <div className = "alpha-background">
      <img className = "alpha-logo" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Antu_spotify.svg/2000px-Antu_spotify.svg.png" />
      <h1 className="alpha-title">Alpha</h1>
      <nav className = "spotify-auth-bar">
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to='/home' className ="spotify-auth-link">Home</Link>
              <a href='#' onClick={handleClick} className = "spotify-auth-link">Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to='/login' className = "spotify-auth-link">Login</Link>
              <Link to='/signup' className = "spotify-auth-link">Sign Up</Link>
            </div>
        }
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
