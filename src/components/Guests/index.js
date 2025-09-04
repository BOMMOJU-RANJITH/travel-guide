import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Guests extends Component {
  state = {
    adults: 1,
    children: 0,
    infants: 0,
  }

  // Increment count
  handleIncrement = type => {
    this.setState(prevState => ({
      [type]: prevState[type] + 1,
    }))
  }

  // Decrement count (min 0, except adults should be at least 1)
  handleDecrement = type => {
    this.setState(prevState => {
      const minValue = type === 'adults' ? 1 : 0
      return {
        [type]:
          prevState[type] > minValue ? prevState[type] - 1 : prevState[type],
      }
    })
  }

  handlePrevious = () => {
    const {history} = this.props
    history.push('/date-selection') // Go back to step 2
  }

  handleNext = () => {
    const {adults, children, infants} = this.state
    const tripData = JSON.parse(localStorage.getItem('tripData')) || {}

    tripData.guests = {adults, children, infants}
    localStorage.setItem('tripData', JSON.stringify(tripData))
    const {history} = this.props
    history.push('/travel-assistance') // Go to step 4
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {adults, children, infants} = this.state

    return (
      <>
        <Header />
        <div className="container">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="step completed">
              <span>✔</span> Your Details
            </div>
            <div className="step completed">
              <span>✔</span> Date Selection
            </div>
            <div className="step active">
              <span>3</span> Guests
            </div>
            <div className="step">
              <span>4</span> Travel Assistance
            </div>
            <div className="step">
              <span>5</span> Confirmation
            </div>
          </div>

          {/* Main Content */}
          <div className="form-section">
            <h2>Guests</h2>
            <p>Select your Guests</p>

            {/* Adults */}
            <div className="guest-row">
              <div>
                <h4>Adults</h4>
                <p>Age 13 or above</p>
              </div>
              <div className="controls">
                <button onClick={() => this.handleDecrement('adults')}>
                  -
                </button>
                <span>{adults}</span>
                <button onClick={() => this.handleIncrement('adults')}>
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="guest-row">
              <div>
                <h4>Children</h4>
                <p>Age 2-12</p>
              </div>
              <div className="controls">
                <button onClick={() => this.handleDecrement('children')}>
                  -
                </button>
                <span>{children}</span>
                <button onClick={() => this.handleIncrement('children')}>
                  +
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="guest-row">
              <div>
                <h4>Infants</h4>
                <p>Under 2</p>
              </div>
              <div className="controls">
                <button onClick={() => this.handleDecrement('infants')}>
                  -
                </button>
                <span>{infants}</span>
                <button onClick={() => this.handleIncrement('infants')}>
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="btn-container">
              <button
                type="button"
                onClick={this.handlePrevious}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={this.handleNext}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Guests
