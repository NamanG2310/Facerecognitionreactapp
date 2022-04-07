import './App.css';
import Navigation from './components/Navigation/Navigation';
import Facerecognition from './components/Facerecognition/Facerecognition';
import Logo from './components/Logo/Logo';
import Imageform from './components/Imageform/Imageform';
import Rank from './components/Rank/Rank';
import { Component } from 'react';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from "react-tsparticles";
const app = new Clarifai.App({
  apiKey: '385155d7b18a44af81ffbfb2ba59798a'
});
const particlesorigin = {
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      route: 'Signin',
      isSignedIn: false
    }
  }
  onInputChange = (event) => {
    console.log(event.target.value);
  }
  onButtonClick = () => {
    console.log("click");
    // app.models.predict(
    //   "385155d7b18a44af81ffbfb2ba59798a",
    //    "https://samples.clarifai.com/face-det.jpg")
    //    .then(
    //   function (response) {
    //     console.log(response);
    //   },
    //   function (err) {

    //   }
    // );

  }
  onRouteChange = (route) => {
    if (route == 'signout') {
      this.setState({ isSignedIn: false })
    }
    else if (route == 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }
  render() {
    const { isSignedIn, route } = this.state;
    return (

      <div className="App">
        <Particles className='particles'
          params={particlesorigin} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <Imageform
              onInputChange={this.onInputChange}
              onButtonClick={this.onButtonClick} />
            <Facerecognition />
          </div>
          : (
            route === 'Signin'
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )

        }
      </div>
    );
  }
}

export default App;
