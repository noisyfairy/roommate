import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  SignupPage,
  UserHome,
  Main,
  Questions,
  Profile,
  Users,
  Algo,
  FavoriteUsers,
  SingleUser,
  ConnectedMapAndQuestions,
  UserInfoForm,
  QuestionsForm,
  ConnectedMapQuestionnaireAnswer,
  MapWithData
} from './components'
import {me, getMapData, getSubwayMapData, getArrestMapData} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    console.log(isLoggedIn)
    console.log('routes hit')
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={SignupPage} />
        {/* <Route exact path="/main" component={Main} /> */}
        {/* <Route exact path="/home" component={UserHome} /> */}
        <Route exact path="/map" component={ConnectedMapAndQuestions} />
        <Route exact path="/questions" component={Questions} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/signup" component={Signup} /> */}
        <Route
          exact
          path="/answer"
          component={ConnectedMapQuestionnaireAnswer}
        />
        {/* // <Route exact path="/neighborhoods" component={ NYCNeighborhoods } /> */}
        <Route exact path="/knowledge-map" component={MapWithData} />
        {/* // <Route exact path="/neighborhoods" component={ NYCNeighborhoods } /> */}

        <Route exact path="/users" component={Users} />
        {isLoggedIn && (
          <Switch>
            {/* {/* Routes placed here are only available after logging in */}
            <Route exact path="/matchUsers" component={Algo} />
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/users/:userId" component={SingleUser} />
            <Route exact path="/preference" component={QuestionsForm} />
            <Route exact path="/userinfo" component={UserInfoForm} />
            <Route exact path="/home" component={UserHome} />
            {/* <Route exact path="/favoriteUsers" component={FavoriteUsers} /> */}

            <Route exact path="/users" component={Users} />
          </Switch>
        )}
        <Route component={Main} />
        {/* <Redirect to="/main" /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    async loadInitialData() {
      await dispatch(me())
      dispatch(getMapData())
      dispatch(getSubwayMapData())
      dispatch(getArrestMapData())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
