import React, { Component } from 'react';
import Nav from './components/Nav';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition';
import './App.css';
import particlesConfig from './particles';
import Clarifai from 'clarifai';
import Signin from './components/Signin';
import Register from './components/Register';

const app = new Clarifai.App({
  apiKey: '00901fec7bca497c985778eb0a680ef5'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  } 
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({
      box: box
    })
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    })
  }

  btnClick = () => {
    this.setState({
      imageUrl: this.state.input,
    })
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))
          .catch(err => console.log(err))
      );
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
        <Particles 
          className='particles'
          params={particlesConfig}
        />
        <Nav isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                btnClick={this.btnClick}  
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
              route === 'signin' 
              ? <Signin onRouteChange={this.onRouteChange} /> 
              : <Register onRouteChange={this.onRouteChange} /> 
            )
        }
      </div>
    );
  }
}

export default App;
