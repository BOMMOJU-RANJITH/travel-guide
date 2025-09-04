import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import BookANewTripRoute from './components/BookANewTripRoute'
import DateSelectionRoute from './components/DateSelection'
import Guests from './components/Guests'
import TravelAssistance from './components/TravelAssistance'
import Confirmation from './components/confirmation'
import MyTrips from './components/MyTrips'
import NotFound from './components/NotFound'

// Note: Use the lists in your code to pass the test cases
// const stepsList = [
//   {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
//   {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
//   {stepId: 'GUESTS', displayText: 'Guests'},
//   {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
//   {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
// ]

// const travelAssistanceList = [
//   {value: 'car', displayText: 'Car'},
//   {value: 'flight', displayText: 'Flight'},
//   {value: 'bus', displayText: 'Bus'},
//   {value: 'train', displayText: 'Train'},
// ]

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/book-a-new-trip" component={BookANewTripRoute} />
      <Route exact path="/date-selection" component={DateSelectionRoute} />
      <Route exact path="/guests" component={Guests} />
      <Route exact path="/travel-assistance" component={TravelAssistance} />
      <Route exact path="/confirmation" component={Confirmation} />
      <Route exact path="/my-trips" component={MyTrips} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
