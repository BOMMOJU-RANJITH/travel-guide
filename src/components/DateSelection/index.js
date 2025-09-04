import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class DateSelectionRoute extends Component {
  state = {
    startDate: '',
    endDate: '',
    touched: {
      startDate: false,
      endDate: false,
    },
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleBlur = field => {
    this.setState(prev => ({
      touched: {...prev.touched, [field]: true},
    }))
  }

  validate = () => {
    const {startDate, endDate} = this.state
    const errors = {
      startDate: '',
      endDate: '',
    }

    if (!startDate.trim()) {
      errors.startDate = 'Select start date'
    }

    if (!endDate.trim()) {
      errors.endDate = 'Select end date'
    }

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      errors.endDate = 'The end date cannot be less than the start date'
    }

    return errors
  }

  handleSubmit = event => {
    event.preventDefault()
    const errors = this.validate()
    const {startDate, endDate} = this.state
    const {history} = this.props

    if (errors.startDate || errors.endDate) {
      this.setState({
        touched: {startDate: true, endDate: true},
      })
      return
    }

    const tripData = JSON.parse(localStorage.getItem('tripData')) || {}
    tripData.startDate = startDate
    tripData.endDate = endDate
    localStorage.setItem('tripData', JSON.stringify(tripData))

    history.push('/guests')
  }

  handlePrevious = () => {
    const {history} = this.props
    history.push('/book-a-new-trip')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {touched, startDate, endDate} = this.state
    const errors = this.validate()

    return (
      <>
        <Header />
        <div className="container">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="step completed">
              <span>✔</span> Your Details
            </div>
            <div className="step active">
              <span>2</span> Date Selection
            </div>
            <div className="step">
              <span>3</span> Guests
            </div>
            <div className="step">
              <span>4</span> Travel Assistance
            </div>
            <div className="step">
              <span>5</span> Confirmation
            </div>
          </div>

          {/* Main Form */}
          <div className="form-section">
            <h2>Date Selection</h2>
            <p>Select your Start and End Date.</p>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={startDate}
                onChange={this.handleChange}
                onBlur={() => this.handleBlur('startDate')}
                className={
                  touched.startDate && errors.startDate ? 'error-input' : ''
                }
              />
              {touched.startDate && errors.startDate && (
                <span className="error">{errors.startDate}</span>
              )}

              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={endDate}
                onChange={this.handleChange}
                onBlur={() => this.handleBlur('endDate')}
                className={
                  touched.endDate && errors.endDate ? 'error-input' : ''
                }
              />
              {touched.endDate && errors.endDate && (
                <span className="error">{errors.endDate}</span>
              )}

              <div className="btn-container">
                <button
                  type="button"
                  onClick={this.handlePrevious}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
                <button type="submit" className="btn btn-primary">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(DateSelectionRoute)
