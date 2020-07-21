import React from 'react';
import GoogleLogin from 'react-google-login';

const Oaths = ({googlesignup}) => {
    const responseGoogle = (response) => {
        const {email} = response.profileObj
        googlesignup(email);
    }
    return (
        <div className='oth'>
            <GoogleLogin
                clientId="728214676777-493jan7d4lath88a9k15s40jq88bnj2o.apps.googleusercontent.com" //"728214676777-ma4ed69te73nj6k09o470kj6nrvdaq77.apps.googleusercontent.com"
                render={renderProps => (
                    <button onClick={renderProps.onClick}><i className="fa fa-google"> <span className='authname'>Google</span></i></button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />

        </div>
    );
}

export default Oaths;