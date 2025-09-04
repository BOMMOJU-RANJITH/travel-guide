import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class BookANewTripRoute extends Component {
  state = {
    name: '',
    startLocation: '',
    endLocation: '',
    touched: {
      name: false,
      startLocation: false,
      endLocation: false,
    },
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleBlur = field => {
    this.setState(prevState => ({
      touched: {...prevState.touched, [field]: true},
    }))
  }

  validate = () => {
    const {name, startLocation, endLocation} = this.state
    return {
      name: name.trim() === '',
      startLocation: startLocation.trim() === '',
      endLocation: endLocation.trim() === '',
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const errors = this.validate()
    const hasErrors = Object.values(errors).some(error => error)

    if (hasErrors) {
      this.setState({
        touched: {
          name: true,
          startLocation: true,
          endLocation: true,
        },
      })
      return
    }
    const {name, startLocation, endLocation} = this.state
    const {history} = this.props
    const formData = {name, startLocation, endLocation}
    localStorage.setItem('tripData', JSON.stringify(formData))

    history.push('/date-selection')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {name, startLocation, endLocation, touched} = this.state
    const errors = this.validate()

    return (
      <>
        <Header />
        <div className="container">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="step active">
              <span>1</span> Your Details
            </div>
            <div className="step">
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
            <h2>Your Details</h2>
            <p>Enter your name and location details</p>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={this.handleChange}
                onBlur={() => this.handleBlur('name')}
                className={touched.name && errors.name ? 'error-input' : ''}
              />
              {touched.name && errors.name && (
                <span className="error">Enter your name</span>
              )}

              <label htmlFor="startLocation">Start Location</label>
              <input
                id="startLocation"
                type="text"
                name="startLocation"
                placeholder="Enter start location"
                value={startLocation}
                onChange={this.handleChange}
                onBlur={() => this.handleBlur('startLocation')}
                className={
                  touched.startLocation && errors.startLocation
                    ? 'error-input'
                    : ''
                }
              />
              {touched.startLocation && errors.startLocation && (
                <span className="error">Enter your start location</span>
              )}

              <label htmlFor="endLocation">End Location</label>
              <input
                id="endLocation"
                type="text"
                name="endLocation"
                placeholder="Enter end location"
                value={endLocation}
                onChange={this.handleChange}
                onBlur={() => this.handleBlur('endLocation')}
                className={
                  touched.endLocation && errors.endLocation ? 'error-input' : ''
                }
              />
              {touched.endLocation && errors.endLocation && (
                <span className="error">Enter your end location</span>
              )}

              <div className="btn-container">
                <button type="submit">Next</button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

// ✅ withRouter is required in React Router v5

export default withRouter(BookANewTripRoute)

// import React, {Component} from 'react'
// import {Redirect} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import Header from '../Header'
// import './index.css'

// class BookANewTripRoute extends Component {
//   state = {
//     name: '',
//     startLocation: '',
//     endLocation: '',
//     touched: {
//       name: false,
//       startLocation: false,
//       endLocation: false,
//     },
//   }

//   handleChange = event => {
//     this.setState({[event.target.name]: event.target.value})
//   }

//   handleBlur = field => {
//     this.setState(prevState => ({
//       touched: {...prevState.touched, [field]: true},
//     }))
//   }

//   validate = () => {
//     return {
//       name: this.state.name.trim() === '',
//       startLocation: this.state.startLocation.trim() === '',
//       endLocation: this.state.endLocation.trim() === '',
//     }
//   }

//   handleSubmit = event => {
//     event.preventDefault()
//     const errors = this.validate()

//     // Check if any field has an error
//     const hasErrors = Object.values(errors).some(error => error)

//     if (hasErrors) {
//       // Mark all fields as touched to show error messages
//       this.setState({
//         touched: {
//           name: true,
//           startLocation: true,
//           endLocation: true,
//         },
//       })
//       return // Stop form submission
//     }

//     // If no errors, save data and navigate
//     const formData = {
//       name: this.state.name,
//       startLocation: this.state.startLocation,
//       endLocation: this.state.endLocation,
//     }
//     localStorage.setItem('tripData', JSON.stringify(formData))
//     this.props.history.push('/date-selection')
//   }

//   render() {
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken === undefined) {
//       return <Redirect to="/login" />
//     }

//     const errors = this.validate()
//     const {touched} = this.state

//     return (
//       <>
//         <Header />
//         <div className="container">
//           {/* Sidebar */}
//           <div className="sidebar">
//             <div className="step active">
//               <span>1</span> Your Details
//             </div>
//             <div className="step">
//               <span>2</span> Date Selection
//             </div>
//             <div className="step">
//               <span>3</span> Guests
//             </div>
//             <div className="step">
//               <span>4</span> Travel Assistance
//             </div>
//             <div className="step">
//               <span>5</span> Confirmation
//             </div>
//           </div>

//           {/* Main Form */}
//           <div className="form-section">
//             <h2>Your Details</h2>
//             <p>Enter your name and location details</p>
//             <form onSubmit={this.handleSubmit}>
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter name"
//                 value={this.state.name}
//                 onChange={this.handleChange}
//                 onBlur={() => this.handleBlur('name')}
//                 className={touched.name && errors.name ? 'error-input' : ''}
//               />
//               {touched.name && errors.name && (
//                 <span className="error">Enter your name</span>
//               )}

//               <label>Start Location</label>
//               <input
//                 type="text"
//                 name="startLocation"
//                 placeholder="Enter start location"
//                 value={this.state.startLocation}
//                 onChange={this.handleChange}
//                 onBlur={() => this.handleBlur('startLocation')}
//                 className={
//                   touched.startLocation && errors.startLocation
//                     ? 'error-input'
//                     : ''
//                 }
//               />
//               {touched.startLocation && errors.startLocation && (
//                 <span className="error">Enter your start location</span>
//               )}

//               <label>End Location</label>
//               <input
//                 type="text"
//                 name="endLocation"
//                 placeholder="Enter end location"
//                 value={this.state.endLocation}
//                 onChange={this.handleChange}
//                 onBlur={() => this.handleBlur('endLocation')}
//                 className={
//                   touched.endLocation && errors.endLocation ? 'error-input' : ''
//                 }
//               />
//               {touched.endLocation && errors.endLocation && (
//                 <span className="error">Enter your end location</span>
//               )}

//               <div className="btn-container">
//                 <button type="submit">Next</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </>
//     )
//   }
// }

// export default BookANewTripRoute
