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
  apiKey: '9eaba5f5dc6c4693be823e920206a0cd'
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
      imageurl: '',
      box:{},
      route: 'Signin',
      isSignedIn: false
    }
  }
  claculateFaceLocaion = (data) =>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width,height);
    return{
      leftCol: face.left_col*width,
      topRow: face.top_row*height,
      rightCol:width - (face.right_col * width),
      bottomRow:height - (face.bottom_row * height)
    }
  }
  displayFace =(box)=>{
    console.log(box);
    this.setState({box:box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonClick = () => {
    console.log("click");
    this.setState({imageurl:this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFace(this.claculateFaceLocaion(response)))
      .catch(err => console.log(err));
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
            <Facerecognition box={this.state.box} imageurl={this.state.imageurl}/>
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



    // const raw = JSON.stringify({
    //   "user_app_id": {
    //         "user_id": "{naman_goyal}",
    //         "app_id": "{naman}"
    //     },
    //   "inputs": [
    //     {
    //       "data": {
    //         "image": {
    //           "url": "https://samples.clarifai.com/face-det.jpg"
    //         }
    //       }
    //     }
    //   ]
    // });
    
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'applications/json',
    //     'Authorization': 'Key {9eaba5f5dc6c4693be823e920206a0cd}'
    //   },
    //   body: raw
    // };
    
    // // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // // this will default to the latest version_id
    
    // fetch("https://api.clarifai.com/v2/models/{FACE_DETECT_MODEL}/outputs", requestOptions)//https://api.clarifai.com/v2/models/{face-detection}/versions/{45fb9a671625463fa646c3523a3087d5}/outputs", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(JSON.parse(result, null, 2)))
    //   .catch(error => console.log('error', error));
    // this.setState({imageUrl: this.state.input});
    // app.models
    //   .predict(
    // // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    // // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    // // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
    // // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    // // so you would change from:
    // // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    // // to:
    // // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
    //     Clarifai.FACE_DETECT_MODEL,
    //     // this.state.input)
    //   )
    //   .then(response => {
    //     console.log('hi', response)
    //     if (response) {
    //       fetch('http://localhost:3000/image', {
    //         // method: 'put',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //           id: this.state.user.id
    //         })
    //       })
    //         .then(response => response.json())
    //         .then(count => {
    //           this.setState(Object.assign(this.state.user, { entries: count}))
    //         })

    //     }
    //     // this.displayFaceBox(this.calculateFaceLocation(response))
    //   })
    //   .catch(err => console.log(err));
