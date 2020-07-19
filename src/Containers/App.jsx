import React, { Component } from 'react';
import '../styles/App.css';
import Particles from 'react-particles-js';
import InnerApp from './innerApp';
import Out from './Out'; 

const backend_url = 'https://facerecogination-back-end.herokuapp.com';

const particles_options={
  particles: {
    number: {
      value:160,
      density: {
        enable: true,
        value_area:1000
      }
    }
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state={
        signclick:localStorage.getItem('state') || 'loggedout' ,
        input: '',
        boxes:[],
        faces: 0,
        user:{
          name: localStorage.getItem('username'),
          enteries: localStorage.getItem('enteries'),
          id: localStorage.getItem('id'),
        }
      }
}
loaduser = (user) => {
  this.setState({
    user:{
      name: user.username,
      enteries: user.enteries
    }
  }, () => {
    localStorage.setItem('username',user.username);
    localStorage.setItem('enteries',user.enteries);
    localStorage.setItem('id',user.id);
  });
}

Calculatefacedata = (data) => {
  let dta=[];
  for(let i = 0; i < data.outputs[0].data.regions.length; i++){
      const clarififace =data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('inputimg');
      const width = Number(image.width);
      const height = Number(image.height);
      const values={
        leftcol: clarififace.left_col*width,
        toprow: clarififace.top_row*height,
        rightcol: width - (clarififace.right_col * width),
        bottomrow: height - (clarififace.bottom_row * height)
      }
      this.setState({faces:this.state.faces+1});
      dta.push(values);
    }
  return dta;
}

displayfacebox = (boxes) => {
  this.setState({boxes: boxes })
}

signout = (route) => {
  if(route==='loggedout') {
    this.setState({
        signclick: 'loggedout'
      },() =>{
        localStorage.setItem('state',this.state.signclick);
      });
  }
  if(route==='home'){
    this.setState({
      signclick: 'home'
    },() =>{
      localStorage.setItem('state',this.state.signclick);
    });
  }
}

logout = () =>{
  this.signout('loggedout');
  localStorage.clear();
  this.setState({boxes:[]});
  this.setState({input:''});
}

onInputChange = (event) =>{
  this.setState({boxes: []});
  this.setState({faces:0});
  this.setState({input: event.target.value});
}

onSubmit = () => {
  fetch(backend_url + '/imageurl',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch(backend_url+'/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            id:localStorage.getItem('id')
          })
        }).then(response => response.json())
        .then(count =>{
          this.setState({
            user:{enteries:localStorage.setItem('enteries',count)}
          })
        }).catch(err=> console.log(err))
      }
      this.displayfacebox(this.Calculatefacedata(response))})
    .catch(err=> console.log(err));
}

render(){
    return (
      <div className="App">
        <Particles params={particles_options} className='particles'/>
        {
          this.state.signclick==='loggedout'?
          <Out loaduser={this.loaduser} logout={this.logout} signclick={this.signout} backend_url={backend_url}/>:
          <InnerApp faces={this.state.faces} boxes={this.state.boxes} onInputChange={this.onInputChange} ImgURL={this.state.input} onSubmit={this.onSubmit} logout={this.logout}/>
        }
      </div>
    );
  }
}

export default App;
