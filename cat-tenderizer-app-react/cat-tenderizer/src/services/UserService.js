import {updateUser, registrationFail, loginFail} from '../actions'

class UserService{
  constructor(){
    this.baseUrl = 'http://localhost:4000'
    this.headers = {
      'Content-Type': 'application/json'
    }
  }
  submitRegistration(attributes){
    const params = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(attributes)
    }
    fetch(`${this.baseUrl}/users`, params).then((response)=>{
      if(response.ok){
        response.json().then((body)=>{
          updateUser(body.user)
        })
      }else{
        response.json().then((body)=>{
          registrationFail(body.errors.errors)
        })
      }
    })
  }

  submitLogin(attributes){
    const params = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(attributes)
    }
    fetch(`${this.baseUrl}/login`, params).then((response)=>{
      if(response.ok){
        response.json().then((body)=>{
          updateUser(body.user)
        })
      }else{
        loginFail()
      }
    })
  }
}

const service = new UserService()
export default service
