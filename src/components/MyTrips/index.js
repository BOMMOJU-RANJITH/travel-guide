import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class MyTrips extends Component {
  state = {
    trips: [],
  }

  componentDidMount() {
    const storedTrips = JSON.parse(localStorage.getItem('allTrips')) || []
    this.setState({trips: storedTrips})
  }

  handleCancel = idToRemove => {
    const {trips} = this.state
    const updatedTrips = trips.filter(trip => trip.id !== idToRemove)
    localStorage.setItem('allTrips', JSON.stringify(updatedTrips))
    this.setState({trips: updatedTrips})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to='/login' />
    }

    const {trips} = this.state
    const {history} = this.props

    return (
      <>
        <Header />
        <div className='my-trips-container'>
          <h2 className='my-trips-title'>My Trips</h2>
          {trips.length === 0 ? (
            <div className='no-trips-view'>
              <h3 className='no-trips-heading'>No upcoming trips.</h3>
              <p className='no-trips-description'>
                When you book a trip, you will see your trip details here.
              </p>
              <button
                className='book-trip-button'
                onClick={() => history.push('/')}
              >
                Book a new trip
              </button>
            </div>
          ) : (
            trips.map(trip => (
              <div className='trip-card' key={trip.id}>
                <div className='trip-details'>
                  <h3 className='trip-location'>{trip.endLocation}</h3>
                  <p className='trip-date'>
                    Date: {trip.startDate} to {trip.endDate}
                  </p>
                </div>
                <button
                  className='cancel-button'
                  onClick={() => this.handleCancel(trip.id)}
                >
                  Cancel
                </button>
              </div>
            ))
          )}
        </div>
      </>
    )
  }
}

export default withRouter(MyTrips)
