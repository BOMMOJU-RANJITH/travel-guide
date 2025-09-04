import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class TravelAssistance extends Component {
  state = {
    assistanceEnabled: false,
    assistanceType: '',
  }

  handleCheckboxChange = event => {
    this.setState({assistanceEnabled: event.target.checked})
  }

  handleSelectChange = event => {
    this.setState({assistanceType: event.target.value})
  }

  handlePrevious = () => {
    const {history} = this.props
    history.push('/guests') // Back to step 3
  }

  handleNext = () => {
    const {assistanceEnabled, assistanceType} = this.state
    const tripData = JSON.parse(localStorage.getItem('tripData')) || {}

    tripData.travelAssistance = assistanceEnabled ? assistanceType : null
    localStorage.setItem('tripData', JSON.stringify(tripData))
    const {history} = this.props
    history.push('/confirmation') // Move to step 5
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {assistanceEnabled, assistanceType} = this.state

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
            <div className="step completed">
              <span>✔</span> Guests
            </div>
            <div className="step active">
              <span>4</span> Travel Assistance
            </div>
            <div className="step">
              <span>5</span> Confirmation
            </div>
          </div>

          {/* Main Content */}
          <div className="form-section">
            <h2>Travel Assistance</h2>
            <p>Select your Travel Assistance.</p>

            <div className="assistance-box">
              <label>
                <input
                  type="checkbox"
                  checked={assistanceEnabled}
                  onChange={this.handleCheckboxChange}
                />{' '}
                Travel Assistance
              </label>

              {assistanceEnabled && (
                <div className="select-box">
                  <label htmlFor="assistance">Travel Assistance</label>
                  <select
                    id="assistance"
                    value={assistanceType}
                    onChange={this.handleSelectChange}
                  >
                    <option value="">-- Select --</option>
                    <option value="Flight">Flight</option>
                    <option value="Bus">Bus</option>
                    <option value="Car">Car</option>
                    <option value="Train">Train</option>
                  </select>
                </div>
              )}
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

export default TravelAssistance
