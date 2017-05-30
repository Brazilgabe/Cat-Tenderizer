import React, { Component } from 'react';
import UserStore from '../stores/UserStore'

class UserDetail extends Component {
  constructor(props){
    super(props)
    this.state={
      user: UserStore.getFields(),
    }
    this.updateUser = this.updateUser.bind(this)
  }

  componentWillMount(){
    UserStore.on('change', this.updateUser)
  }
  componentWilUnmount(){
    UserStore.removeListener('change', this.updateUser)
  }
  updateUser(){
    this.setState({user: UserStore.getFields()})
  }

  render() {
    return (
      <div className='row'>
        <div className="col-xs-12">
          <h2>User Details</h2>
          <ul className='list-group'>
            <li className='list-group-item'>
              First Name: {this.state.user.firstName}
            </li>
            <li className='list-group-item'>
              Last Name: {this.state.user.lastName}
            </li>
            <li className='list-group-item'>
              Email: {this.state.user.email}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default UserDetail
