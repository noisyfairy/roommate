import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {updateMapScore, updateMapRender} from '../store/index'

const Navbar = ({handleClick, isLoggedIn, increment, updateRender}) => (
  <div>
    <h1> Room8s </h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/questionform"> Questions?</Link>
          <Link to="/map">Map</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <button
            type="button"
            onClick={function(event) {
              increment(), updateRender()
            }}
          >
            increment
          </button>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/map">Map</Link>
          <button
            type="button"
            onClick={function(event) {
              increment(), updateRender()
            }}
          >
            increment
          </button>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    increment: () => dispatch(updateMapScore(0)),
    updateRender: () => dispatch(updateMapRender())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
