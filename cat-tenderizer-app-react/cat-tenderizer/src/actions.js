import Dispatcher from './Dispatcher'

export function updateCats(){
  // make the api calls to get the list of cats
  const params = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:4000/cats", params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        Dispatcher.dispatch({
          type: 'UPDATE_CATS',
          cats: body.cats
        })
      })
    }
  }).catch(function(error){
    //TODO handle errors
  })
  // update the store with a dispatch
}


export function addCat(attributes){
  // set up the headers and request
  const params = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attributes)
  }
  // send state to the backend server
  fetch("http://localhost:4000/create_cat", params).then(function(response){
    // if post is successful update the message to be successful
    // and update the state to equal what we get back from the server
    if(response.status === 200){
      response.json().then(function(body){
        // send the cat to the store
        Dispatcher.dispatch({
          type: 'CREATE_CAT',
          cat: body.cat
        })
      })
    }
  }).catch(function(error){
    this.setState({
      message: 'there was an error: ' + error.errors.join("\n")
    })
  })

  // const params = {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify(attributes)
  // }
  // // send state to the backend server
  // fetch("http://localhost:4000/create_cat", params).then(function(response){
  //   // if post is successful update the message to be successful
  //   // and update the state to equal what we get back from the server
  //   if(response.status === 200){
  //     response.json().then(function(body){
  //       Dispatcher.dispatch({
  //         type: 'CREATE_CAT',
  //         cat: body.cat
  //       })
  //     })
  //   } else {
  //     // else update the message to say there was a failure
  //   }
  // }).catch(function(error){
  //   //TODO error handling
  // })
  //
}
export function updateRegistration(attribute, value){
  Dispatcher.dispatch({
    type: 'UPDATE_REGISTRATION',
    attribute: attribute,
    value: value
  })
}
export function submitRegistration(userAttributes){
  Dispatcher.dispatch({
    type: 'REGISTRATION_SUBMIT'
  })
}
export function registrationFail(errors){
  Dispatcher.dispatch({
    type: 'REGISTRATION_FAILED',
    errors: errors
  })
}

export function updateLogin(attribute, value){
  Dispatcher.dispatch({
    type: 'UPDATE_LOGIN',
    attribute: attribute,
    value: value
  })
}

export function submitLogin(loginAttributes){
  Dispatcher.dispatch({
    type: 'LOGIN_SUBMIT'
  })
}

export function loginFail(){
  Dispatcher.dispatch({
    type: 'LOGIN_FAILED'
  })
}

export function logout(){
  Dispatcher.dispatch({
    type: 'LOGOUT'
  })
}

export function updateUser(attributes){
  Dispatcher.dispatch({
    type: 'UPDATE_USER',
    attributes: attributes
  })
}
