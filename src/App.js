import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
const app = new Clarifai.App({
  apiKey: '2a7ca097352c4198a4b471e9e627b1ed'
 });

const ParticleOptions = {
  
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }
  calculateFaceLocation = (data) =>{
    const clariFaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clariFaiFace.left_col * width,
      topRow: clariFaiFace.top_row * height,
      rightCol: width - (clariFaiFace.right_col * width),
      BottomRow: height - (clariFaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
     this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }
 onRouteChange = (route) => {
   if (route === 'signout') {
     this.setState({isSignedIn: false})
   } else if (route === 'home') {
     this.setState({isSignedIn: true})
   }
   this.setState({route: route});
 }
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
       <Particles className= 'particles'
              params={ParticleOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' ?
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : (
              route ==='signin' 
                ? <Signin onRouteChange={this.onRouteChange}/>
                : <Register onRouteChange={this.onRouteChange}/>
              )

        }
      </div>
    );
  }
}

export default App;
