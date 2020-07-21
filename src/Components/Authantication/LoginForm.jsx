import React, { Component } from 'react';
import Login from './Login';
import Signup from './SignUp';
import Forgotpass from './Forgotpass'
import Oaths from './Oaths';
import '../../styles/login.scss';
import Nav1 from './Nav1';

class Loginform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: false,
            issignup: false,
            frgt: false,
            glog: 0,
        }
    }   
    loginslider = () => {
        this.setState(prevState => ({ pos: !prevState.pos }));
        this.setState({issignup:false,frgt:false})
    }
    signupfunc = () => {
        this.setState(prevState => ({ issignup: !prevState.issignup }));
        return false;
    }
    frgtpass = () => {
        this.setState(prevState => ({ frgt: !prevState.frgt }));
    }

    googlesignup = (email) => {
        fetch(this.props.backend_url +'/gauth',{
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email
          })
        })
          .then(res=> res.json())
          .then(data=>{
            if(data.status === 'sucess'){
              this.props.loaduser(data);
              this.props.signclick('home');
            }
            else{
              this.setState({glog:1});
            }
          })
          .catch(err=>console.log('error fetching token'))
      }


    render() {
        return (
            <>
                <Nav1 login={this.loginslider} register={this.signupfunc}/>
                <div className="wrapper">
                    <div className={`login-text ${this.state.pos ? 'expand' : ''} ${this.state.issignup ? 'sl' : 'll'}`}>
                        <button className={`cta ${this.state.pos ? 'ctan' : ''}`} onClick={this.loginslider}><i className={`${this.state.pos ? 'up' : 'down'}`}></i></button>
                        <div className={`text ${this.state.pos ? 'show-hide fl' : ''}`}>
                            <div className={`${this.state.frgt ? 'hide' : 'show-hide'}`}>
                                <div className={`leftside ${this.state.issignup ? 'hide' : 'showhide'}`}>
                                    <Login glog={this.state.glog} backend_url={this.props.backend_url} loaduser={this.props.loaduser} frgtpass={this.frgtpass} signupfunc={this.signupfunc} signclick={this.props.signclick}/>
                                </div>
                                <div className={`signleft ${this.state.issignup ? 'show-hide' : 'hide'}`}>
                                    <Signup  signupfunc={this.signupfunc} backend_url={this.props.backend_url}/>
                                </div>
                            </div>
                            <div className={`frgt ${this.state.frgt ? 'show-hide' : 'hide'}`}>
                                <Forgotpass frgtpass={this.frgtpass} backend_url={this.props.backend_url}/>
                            </div>
                            <div className={`mid ${this.state.frgt ? 'hide' : 'show-hide'}`}>
                                <div className={`${this.state.issignup ? 'svl' : 'vl'}`}></div>
                                <h3 className={`${this.state.issignup ? 'sh' : 'lh'}`}>OR</h3>
                            </div>
                            <div className={`${this.state.issignup ? 'srightside' : 'rightside'} ${this.state.frgt ? 'hide' : 'show-hide'}`}>
                            <Oaths googlesignup={this.googlesignup}/>
                            </div>
                        </div>
                    </div>
                    <div className="call-text">
                        <h1>Developed By <span>Pranav</span> Agarwal</h1>
                        <button onClick={() => { window.location.assign("https://pranavportfolio.netlify.com/") }}>About Me</button>
                    </div>
                </div>
            </>
        );
    }
}

export default Loginform;