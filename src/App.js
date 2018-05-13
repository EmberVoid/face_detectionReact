import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
    apiKey: 'b8aa772c93f9488bbb1e6032ce3ba3fa'
});

const particleOption = {
  particles: {
      number: {
          value: 115,
          density: {
              enable: true,
              value_area: 800
          }
      }
  }
};

class App extends Component {
    constructor () {
        super();
        this.state = {
            input: '',
            imageURL: ''
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    };

    onButtonSubmit = () => {
        this.setState({imageURL: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL , this.state.input).then(
            function(response) {
                console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
            },
            function(err) {
                // there was an error
            }
        );
    };

  render() {
    return (
      <div className="App">
          <Particles className = 'particles'
          params={particleOption}
          />
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;