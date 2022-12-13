import React from 'react';
import GoogleLogin from 'react-google-login';
import { useParams, useNavigate, Link, BrowserRouter } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { gapi } from "gapi-script";
import {useEffect, useState, useRef} from 'react' 

import { client } from '../client';
import { CometChat } from '@cometchat-pro/chat';
import * as CONSTANTS from '../constants/constants';

const Login = () => {
  const [fetchUser, setFetchUser] = useState("");

  const navigate = useNavigate();

  const email_input = useRef()
  const password = useRef()

  useEffect(() => {
    const s = email_input.current.value.substr(0,email_input.current.value.indexOf("@"))

    const query = `*[_type == "user" && _id == '${s}']`
    client.fetch(query).then((arr) => setFetchUser(arr));

  },[fetchUser]);

  const HandleSubmit = () =>{
    const s = email_input.current.value.substr(0,email_input.current.value.indexOf("@"))
    const sp = password.current.value
    if (email_input.current.value === "" || password.current.value === ""){
      alert("Invalid Credentials!");
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    else if (email_input.current.value.search("@") == -1 || email_input.current.value.search(/\./) == -1){
      alert("Invalid Credentials!");
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    else if (email_input.current.value.split("@").length > 2 || email_input.current.value.split(/\./).length > 2){
      alert("Invalid Credentials!");
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    else if (email_input.current.value.search("com") == -1 && email_input.current.value.search("edu") == -1){
      alert("Invalid Credentials!");
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    else if(s == fetchUser[0]?._id && sp == fetchUser[0]?.password){
      localStorage.setItem('user', JSON.stringify({name: s, googleId: s, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU"}));
      navigate('/', { replace: true });
    }
    else if(s == fetchUser[0]?._id && sp != fetchUser[0]?.password){
      alert("Wrong Password!");
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    else {
      alert("Invalid Credentials!");
      localStorage.clear();
      navigate('/login', { replace: true });
    }
  }

  const HandleSignUp = () =>{
    navigate('/signup', { replace: true });
  }

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
      password: 12345,
    };
    client.createIfNotExists(doc).then(() => {
      var userName = doc.userName.split(' ')[0]
      var user = new CometChat.User(userName);
      const appSetting = new CometChat.AppSettingsBuilder()
                    .subscribePresenceForAllUsers()
                    .setRegion(CONSTANTS.APP_REGION)
                    .autoEstablishSocketConnection(true)
                    .build();
CometChat.init(CONSTANTS.APP_ID, appSetting).then(
  () => {
    console.log("Initialization completed successfully"); 
  }, error => {
    console.log("Initialization failed with error:", error);
  }
);
      user.setName(userName);
      console.log("uid", userName)
      CometChat.createUser(user, CONSTANTS.AUTH_KEY).then(
        user => {
            console.log("user created", user);
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
        }, 
        error => {
          CometChat.getLoggedinUser().then(
            (user) => {
                if(!user){
                    CometChat.login(userName, CONSTANTS.AUTH_KEY).then(
                      user => {
                        console.log("Login Successful:", { user });    
                      }, error => {
                        console.log("Actually here")
                        console.log("Login failed with exception:", { error });    
                      }
                    );
                }
            }, error => {
                console.log("Some Error Occured", { error });
            }
          );
          console.log("error", error);
        }
      )
      
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

          <div>
            <form action="post"  onSubmit={HandleSubmit} >
              <div>
                <input type="text" ref={email_input} placeholder="Email" className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none"/>
              </div>
              <div>
               <input type="password" ref={password} placeholder="Password" className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none"/>
              </div>
              <button className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none">
                Sign In
              </button>
            </form>
          </div>

          <h2 className="text-white">-----------------------------------------------------------------</h2>


          <div className="shadow-2xl">
            <form action="post"  onSubmit={HandleSignUp} >
              <button className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none">
                Sign Up
              </button>
            </form>
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