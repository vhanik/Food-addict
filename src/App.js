import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import FoodAddicts from './Components/FoodAddicts/FoodAddicts';
import Logo from './Components/Logo/Logo';
import LinkForm from './Components/LinkForm/LinkForm';
import Count from './Components/Count/Count';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';


const app = new Clarifai.App({
 apiKey: '977e216b7c394d56bcfde7d54ef96067'
});

const particlesParams = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}

const initialState = {
      inputLink:'',
      imageUrl:'',
      ingredients: [], 
      route: 'signin',
      isSignedIn: false,
      users: {
        id:'',
        name:'',
        email:'',
        count:0,
        joined: ''
      }
}

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({users: {
      id: data.id,
      name: data.name,
      email: data.email,
      count: data.count,
      joined: data.joined
    }})
  }


   onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  inputLink = (event) => {
    this.setState({inputLink: event.target.value})
  }

  buttonSubmit = () => { 
    this.setState({imageUrl: this.state.inputLink})
    app.models
      .predict('bd367be194cf45149e75f01d59f77ba7', this.state.inputLink)
      .then(response => {
        this.setState({ingredients: response.outputs[0].data.concepts
          .filter(concept => concept.value >= 0.85)
          .map(concept => concept.name.charAt(0).toUpperCase() + concept.name.slice(1))});
      }
   )
      fetch('https://floating-ocean-65123.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.users.id
            })
          })
        .then(response => response.json())
        .then(number =>   {
          this.setState({users: {
            ...this.state.users, count: number
          }})
      })

      .catch(err => console.log('Couldnt communicate with Clarifai', err));
  }   
  

  render () {
    const { isSignedIn, imageUrl, route, ingredients, } = this.state; 
    return (
    <div className="App">
     <Particles className='particles' params={particlesParams} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

      {route === 'home' ?
        <div>
          <Logo />
          <Count name={this.state.users.name} count={this.state.users.count}/>
          <LinkForm inputLink={this.inputLink} buttonSubmit={this.buttonSubmit}/>
          <FoodAddicts imageUrl={imageUrl} ingredients={ingredients}/> 
        </div>
      
        : (
          this.state.route === ('signin') ? 
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      
        

    </div>
  
  );
  }
}

export default App;
