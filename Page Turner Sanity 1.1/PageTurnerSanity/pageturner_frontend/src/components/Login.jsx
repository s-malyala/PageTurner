import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate, Link, BrowserRouter } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { gapi } from "gapi-script";
import {useEffect} from 'react' 

import { client } from '../client';
import { CometChat } from '@cometchat-pro/chat';
import * as CONSTANTS from '../constants/constants';

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }
  
    gapi.load('client:auth2', start);
  }, []);

  

  const responseGoogle = (response) => {

    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    
    

    client.createIfNotExists(doc).then(() => {
      var userName = doc.userName.split(' ')[0]
      var user = new CometChat.User(userName);
      user.setName("mrunal");
      console.log("uid", userName)
      CometChat.createUser(user, CONSTANTS.AUTH_KEY).then(
        user => {
            console.log("user created", user);
        }, error => {
            console.log("error", error);
        }
      )
      CometChat.getLoggedinUser().then(
        (user) => {
            if(!user){
                CometChat.login(userName, CONSTANTS.AUTH_KEY).then(
                  user => {
                    console.log("Login Successful:", { user });    
                  }, error => {
                    console.log("Login failed with exception:", { error });    
                  }
                );
            }
        }, error => {
            console.log("Some Error Occured", { error });
        }
      );
      navigate('/', { replace: true });
    });


  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
      <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="300px" alt=''/>
        </div>

        <div className="shadow-2xl">
            <input 
              type="text"
              class="form-control block w-full justify-center px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder='Email'
            />
            <br />
            <input 
              type="text"
              class="form-control block w-full justify-center px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder='Password'
            />
            <br />
          </div>

          <div className="shadow-2xl">
            <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center h-8 p-3 rounded-lg cursor-pointer outline-none"
                  //onClick={renderProps.onClick}
                  //disabled={renderProps.disabled}
            > <b>Sign In</b> </button>
            <br />
          </div>

          <div className="shadow-2xl">
            <button
                  type="button"
                  className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none"
                  //onClick={renderProps.onClick}
                  //disabled={renderProps.disabled}
            ><Link to="/forgotpassword">Forgot Password</Link></button>
            
            <button
                  type="button"
                  className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none"
                  //onClick={renderProps.onClick}
                  //disabled={renderProps.disabled}
            >Sign Up</button>
            
          </div>
          
          <h2 className="text-white">-----------------------------------------------------------------</h2>

          <div className="shadow-2xl">
            <br />
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Google Sign In
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>

      </div>
      </div>
    </div>
  )
}

export default Login