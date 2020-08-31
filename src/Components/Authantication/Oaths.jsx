import React from 'react';
import GoogleLogin from 'react-google-login';

const clientid = {
                    heroku: "728214676777-493jan7d4lath88a9k15s40jq88bnj2o.apps.googleusercontent.com",
                    local: "728214676777-ma4ed69te73nj6k09o470kj6nrvdaq77.apps.googleusercontent.com"
                }

const googlebtn = (responseGoogle,btntext) =>{
    return(
        <GoogleLogin
                clientId={clientid.heroku}
                render={renderProps => (
                    <button onClick={renderProps.onClick}><i className="fa fa-google"> <span className='authname'>{btntext}</span></i></button>
                )}
                onSuccess={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
    );
}

const Oaths = ({googlesignup}) => {
    const responseGoogle = (response) => {
        const {email} = response.profileObj;
        googlesignup(email);
    }
    return (
        <div className='oth'>
          {googlebtn(responseGoogle, "LogIn")}
        </div>
    );
}

const Soaths = ({googleregister}) => {
    const responseGoogle = (response) => {
        const {name,email} = response.profileObj;
        googleregister(name,email);
    }
    return (
        <div className='oth'>
          {googlebtn(responseGoogle, "SignUp")}
        </div>
    );
}

export {
    Oaths,
    Soaths
}