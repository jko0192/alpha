import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className ="alpha-container">
        <div className = "alpha-before-login">
          <h1>Welcome to Alpha</h1>
          {/* <h3>Create an Account</h3>
          <form onSubmit={handleSubmit} name={name} className = "alpha-before-login-form">
            <div className = "alpha-input-div">
              <label htmlFor='email'><small>Email:</small></label>
              <input name='email' type='text' placeholder="Enter Email" />
            </div>
            <div className = "alpha-input-div">
              <label htmlFor='password'><small>Password:</small></label>
              <input name='password' type='password' placeholder="Enter Password"/>
            </div>
            <div className ="alpha-login-button">
              <button type='submit'>{displayName}</button>
            </div>
            {error && error.response && <div className="alpha-error-message"> {error.response.data} 
            </div>}
          </form> */}
          <button><a href='/auth/spotify' className="alpha-spotify-connection">{displayName} with Spotify</a></button>
        </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
