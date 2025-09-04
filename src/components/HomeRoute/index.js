import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class HomeRoute extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="hero">
          <div className="hero-text">
            <h1>Travel. Relax. Memories.</h1>
            <p>
              With travel trip you can experience new travel and the best
              tourist destinations.
            </p>
            <Link to="/book-a-new-trip">
              <button className="primary-btn">Book a new trip</button>
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://res.cloudinary.com/dsstckyzh/image/upload/v1755238273/Screenshot_2025-08-15_112446_eypiai.png"
              alt="Traveler with backpack"
            />
          </div>
        </div>
      </>
    )
  }
}

export default HomeRoute
