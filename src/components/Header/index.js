import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  handleLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="navbar">
        <h1 className="logo">Travel Trip</h1>
        <ul className="nav-links">
          <li>
            <Link className="nav-button" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-button" to="/my-trips">
              My Trips
            </Link>
          </li>
        </ul>
        <button className="logout-btn" onClick={this.handleLogout}>
          Logout
        </button>
      </nav>
    )
  }
}

export default withRouter(Header)
