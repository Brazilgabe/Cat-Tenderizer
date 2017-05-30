import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import CatAdd from './components/CatAdd'
import CatIndex from './components/CatIndex'
import catStore from './stores/CatStore'
import {updateCats} from './actions'
import Header from './components/Header'
import Home from './routes/Home'
import UserDetail from './routes/UserDetail'
import UserRegistration from './routes/UserRegistration'
import Login from './routes/Login'
import UserStore from './stores/UserStore'
import {logout} from './actions'

class App extends Component {
  constructor(props){
    super(props)
    updateCats()
    this.state = {
      message: catStore.getMessage()
    }
    this.updateLoginStatus = this.updateLoginStatus.bind(this)
  }

  componentWillMount(){
    catStore.on('message', this.updateMessage.bind(this))
    UserStore.on('change', this.updateLoginStatus)
  }

  componentWillUnmount(){
  UserStore.removeListener('change', this.updateLoginStatus)
}

updateLoginStatus(){
    this.setState({isLoggedIn: UserStore.isLoggedIn()})
  }

  handleLogout(){
    logout()
  }

  updateMessage(){
    this.setState({
      message: catStore.getMessage()
    })
  }



  render() {
    return (
      <div>


        <div className='message'>{this.state.message}</div>
        <Router>
          <div className="App container">
            <Route exact path="/" component={Home} />
            <Route path="/register" render={()=>(this.state.isLoggedIn ? ( <Redirect to='/' /> ) : ( <UserRegistration /> ))} />
            <Route path="/user-detail" component={UserDetail} />
            <Route path="/login" component={Login} />
            <Route exact path="/add" component={CatAdd} />
            <Route exact path="/" component={CatIndex} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
