var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Cat = require('./models').Cat
var cors = require('cors')
var User = require('./models').User

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())

const authorization = function(request, response, next){
  const token = request.query.authToken || request.body.authToken
  if(token){
    User.findOne({
      where: {authToken: token}
    }).then((user)=>{
      if(user){
        request.currentUser = user
        next()
      }else{
        response.status(401)
        response.json({message:'Authorization Token Invalid'})
      }
    })
  }else{
    response.status(401)
    response.json({message: 'Authorization Token Required'})
  }
}

app.get('/', function (request, response) {
  response.json({message: 'API Example App'})
});

app.get('/user',
authorization,
function(request, response){
  response.json({user: request.currentUser})
})

app.get('/cats', function(request, response){
  Cat.findAll().then(function(cats){
    response.status(200)
    response.json({status: 'success', cats: cats})
  })
})

app.post('/users', function(request, response){
  User.create(
    {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password
    }
  ).then((user)=>{
    response.json({
      message: 'success',
      user: user
    })
  }).catch((error)=>{
    response.status(400)
    response.json({
      message: "Unable to create User",
      errors: error
    })
  })
})

app.post('/login', function(request, response){
  User.findOne({
    where:{email: request.body.email}
  }).then((user)=>{
    if(user && user.verifyPassword(request.body.password)){
      response.json({
        message: 'Success!',
        user: user
      })
    }else{
      response.status(404)
      response.json({message: 'Invalid Credentials'})
    }
  })
})

app.post('/create_cat', function(request, response){
  console.log(request.body)
  let catParams = request.body.cat
  Cat.create(catParams).then(function(cat){
    response.status(200)
    response.json({status: 'success', cat: cat})
  }).catch(function(error){
    response.status(400)
    response.json({status: 'error', error: error})
  })
})

app.listen(4000, function () {
 console.log('Todo Server listening on port 4000!');
});
