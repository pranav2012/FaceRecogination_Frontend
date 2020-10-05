import React, { Component } from 'react';
import '../styles/App.css';
import Particles from 'react-particles-js';
import InnerApp from './innerApp';
import Out from './Out';
import Nomatch from '../Components/404';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'tachyons';

const backend_url = 'https://facerecogination-back-end.herokuapp.com';

const particles_options = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signclick: localStorage.getItem('state') || 'loggedout',
      input: '',
      boxes: [],
      faces: 0,
      detect_clicked: false,
      isimage: false,
      uploadclicked: false,
      imginbase64: '',
      localinput: '',
      user: {
        name: localStorage.getItem('username'),
        enteries: localStorage.getItem('enteries'),
        id: localStorage.getItem('id'),
      }
    }
  }

  setimgurl = (imgurl) => {
    this.setState({ localinput: imgurl });
  }

  setuploadstate = (isimage, uploadclicked, base64) => {
    this.setState({
      isimage: isimage,
      uploadclicked: uploadclicked,
      imginbase64: base64
    });
  }

  imgdataapi = () => {
    fetch(backend_url + '/upload', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        file: this.state.imginbase64
      })
    }).then(res => res.json())
      .then(response => {
        if (response.status === 'sucess') {
          fetch(backend_url + '/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: localStorage.getItem('id')
            })
          }).then(res => res.json())
            .then(count => {
              this.setState({
                user: { enteries: localStorage.setItem('enteries', count) }
              })
            }).catch(err => console.log(err))
          this.displayfacebox(this.Calculatefacedata(response.data))
        }
        else {
          this.setState({ faces: 'no face detected!' })
        }
      }).catch(err => console.log('error uploading image'));
  }


  loaduser = (user) => {
    this.setState({
      user: {
        name: (user.username.split(' ').length <= 1)?user.username:user.username.split(' ').slice(0, -user.username.split(' ').length + 1).join(' '),
        enteries: user.enteries,
        id: user.id
      }
    }, () => {
      localStorage.setItem('username',(user.username.split(' ').length <= 1)?user.username:user.username.split(' ').slice(0, -user.username.split(' ').length + 1).join(' '));
      localStorage.setItem('enteries', user.enteries);
      localStorage.setItem('id', user.id);
    });
  }

  Calculatefacedata = (data) => {
    let dta = [];
    for (let i = 0; i < data.outputs[0].data.regions.length; i++) {
      const clarififace = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('inputimg');
      const width = Number(image.width);
      const height = Number(image.height);
      const values = {
        leftcol: clarififace.left_col * width,
        toprow: clarififace.top_row * height,
        rightcol: width - (clarififace.right_col * width),
        bottomrow: height - (clarififace.bottom_row * height)
      }
      this.setState({ faces: this.state.faces + 1 });
      dta.push(values);
    }
    return dta;
  }

  resetval = () => {
    this.setState({
      detect_clicked: false,
      boxes: [],
      faces: 0,
      input: '',
      localinput: '',
      imginbase64: '',
      isimage: false,
      uploadclicked: false
    });
  }

  displayfacebox = (boxes) => {
    this.setState({ boxes: boxes })
  }

  signout = (route) => {
    if (route === 'loggedout') {
      this.setState({
        signclick: 'loggedout'
      }, () => {
        localStorage.setItem('state', this.state.signclick);
      });
    }
    if (route === 'home') {
      this.setState({
        signclick: 'home'
      }, () => {
        localStorage.setItem('state', this.state.signclick);
      });
    }
  }

  logout = () => {
    this.signout('loggedout');
    localStorage.clear();
    this.setState({ boxes: [] });
    this.setState({ input: '' });
  }

  onInputChange = (event) => {
    this.setState({
      detect_clicked: false,
      boxes: [],
      faces: 0,
      input: event.target.value,
      localinput: '',
      imginbase64: '',
      isimage: false,
      uploadclicked: false
    });
  }

  onSubmit = () => {
      if ((this.state.isimage && !this.state.uploadclicked) || this.state.input === '' ){
        if(!this.state.detect_clicked){  
          this.setState({ detect_clicked: true })
          this.imgdataapi();
        }
      }
      else {
        if (!this.state.detect_clicked) {
          this.setState({ detect_clicked: true })
          fetch(backend_url + '/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: this.state.input
            })
          })
            .then(response => response.json())
            .then(response => {
              if (response.status === 'sucess') {
                fetch(backend_url + '/image', {
                  method: 'put',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    id: localStorage.getItem('id')
                  })
                }).then(res => res.json())
                  .then(count => {
                    this.setState({
                      user: { enteries: localStorage.setItem('enteries', count) }
                    })
                  }).catch(err => console.log(err))
                this.displayfacebox(this.Calculatefacedata(response.data))
              }
              else {
                this.setState({ faces: 'no face detected!' })
              }
            })
            .catch(err => console.log(err));
        }
      }
  }
  render() {
    return (
      <Router>
        <div className='App'>
          <Particles params={particles_options} className='particles' />
          <Switch>
            <Route exact path='/'>
              {this.state.signclick === 'loggedout' ? <Redirect to='/' /> : <Redirect to = {'/dashboard/'+ this.state.user.id} />}
              <Out loaduser={this.loaduser} logout={this.logout} signclick={this.signout} backend_url={backend_url} />
            </Route>
            <Route exact path='/dashboard/:id'>
              {this.state.signclick === 'home' ? <Redirect to = {'/dashboard/'+ this.state.user.id} /> : <Redirect to='/' />}
              <InnerApp resetval={this.resetval} setuploadstate={this.setuploadstate} setimgurl={this.setimgurl} faces={this.state.faces} boxes={this.state.boxes} onInputChange={this.onInputChange} localinput={this.state.localinput} ImgURL={this.state.input} onSubmit={this.onSubmit} logout={this.logout} />
            </Route>
            <Route>
              <Nomatch />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
