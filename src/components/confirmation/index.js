import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Confirmation extends Component {
  state = {
    confirmed: false,
    tripData: null,
  }

  componentDidMount() {
    const tripData = JSON.parse(localStorage.getItem('tripData'))
    if (tripData) {
      this.setState({tripData})
    }
  }

  // handleConfirm = () => {
  //   const tripData = JSON.parse(localStorage.getItem('tripData'))
  //   const existingTrips = JSON.parse(localStorage.getItem('alltrips')) || []
  //   existingTrips.push(tripData)
  //   localStorage.setItem('allTrips', JSON.stringify(existingTrips))
  //   this.setState({confirmed: true})
  // }

  handleConfirm = () => {
    const tripData = JSON.parse(localStorage.getItem('tripData'))

    // Get existing trips or initialize with an empty array
    const existingTrips = JSON.parse(localStorage.getItem('allTrips')) || []

    // Push new trip into the array
    existingTrips.push(tripData)

    // Save the updated array back to localStorage
    localStorage.setItem('allTrips', JSON.stringify(existingTrips))

    // Optionally clear the tripData or navigate
    localStorage.removeItem('tripData')

    // Update UI
    this.setState({confirmed: true})
  }

  handleNewTrip = () => {
    const {history} = this.props
    history.push('/book-a-new-trip') // assuming this is the first step
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {tripData, confirmed} = this.state
    const {history} = this.props
    return (
      <>
        <Header />
        <div className="container">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="step completed">✔ Your Details</div>
            <div className="step completed">✔ Date Selection</div>
            <div className="step completed">✔ Guests</div>
            <div className="step completed">✔ Travel Assistance</div>
            <div className={`step ${confirmed ? 'completed' : 'active'}`}>
              {confirmed ? '✔' : <span>5</span>} Confirmation
            </div>
          </div>

          {/* Main Content */}
          <div className="form-section">
            {!confirmed ? (
              <>
                <h2>Confirmation</h2>
                <p>Confirm your details</p>
                {tripData && (
                  <div className="confirmation-box">
                    <p>
                      <strong>Name:</strong> {tripData.name}
                    </p>
                    <p>
                      <strong>Start Location:</strong> {tripData.startLocation}
                    </p>
                    <p>
                      <strong>End Location:</strong> {tripData.endLocation}
                    </p>
                    <p>
                      <strong>Start Date:</strong> {tripData.startDate}
                    </p>
                    <p>
                      <strong>End Date:</strong> {tripData.endDate}
                    </p>
                    <p>
                      <strong>Guests:</strong>
                    </p>
                    <ul>
                      <li>Adults: {tripData.guests.adults}</li>
                      <li>Children: {tripData.guests.children}</li>
                      <li>Infants: {tripData.guests.infants}</li>
                    </ul>
                    <p>
                      <strong>Travel Assistance:</strong>{' '}
                      {tripData.travelAssistance || 'None'}
                    </p>
                    <div className="btn-container">
                      <button
                        className="btn btn-secondary"
                        onClick={() => history.push('/travel-assistance')}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={this.handleConfirm}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="success-box">
                <div className="checkmark">✔</div>
                <h2>Awesome!</h2>
                <p>Your booking has been confirmed.</p>
                <button
                  className="btn btn-primary"
                  onClick={this.handleNewTrip}
                >
                  Book a New Trip
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Confirmation
