import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
}

const butn = () => {
    return (
        <div className='oth'>
            <GoogleLogin
                clientId="728214676777-493jan7d4lath88a9k15s40jq88bnj2o.apps.googleusercontent.com"
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa fa-google"> <span className='authname'>Google</span></i></button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />

        </div>
    );
}

export const SOaths = () => {
    return butn();
}

export const LOaths = () => {
    return butn();
}