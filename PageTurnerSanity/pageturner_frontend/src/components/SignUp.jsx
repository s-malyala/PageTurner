import React from 'react'
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { useParams, useNavigate, Link, BrowserRouter } from 'react-router-dom';
import {useEffect, useState, useRef} from 'react'
import { client } from '../client';

import { CometChat } from '@cometchat-pro/chat';
import * as CONSTANTS from '../constants/constants';

const SignUp = () => {

  const navigate = useNavigate();

  const email_input = useRef()
  const pass = useRef()
  const repass = useRef()
  const user_name = useRef()

  const HandleSubmit = () =>{
    const s = email_input.current.value.substr(0,email_input.current.value.indexOf("@"))
    if (email_input.current.value === "" || pass.current.value === "" || repass.current.value === "" || user_name.current.value === ""){
      
      alert("Invalid Credentials!");
      navigate('/signup', { replace: true });
    }
    else if (email_input.current.value.search("@") == -1 || email_input.current.value.search(/\./) == -1){
      
      alert("Please check your email address!");
      navigate('/signup', { replace: true });
    }
    else if (email_input.current.value.split("@").length > 2 || email_input.current.value.split(/\./).length > 2){
      
      alert("Please check your email address!");
      navigate('/signup', { replace: true });
    }
    else if (email_input.current.value.search("com") == -1 && email_input.current.value.search("edu") == -1){
      alert("Please check your email address!");
      navigate('/signup', { replace: true });
    }
    else if (pass.current.value != repass.current.value){
      alert("Passwords don't match!");
      navigate('/signup', { replace: true });
    }
    else{

      localStorage.setItem('user', JSON.stringify({name: s, googleId: s, imageUrl: "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"}));
      const name = user_name.current.value
      const googleId = s
      const pw = pass.current.value
      const imageUrl = "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"
      const doc = {
        _id: googleId,
        _type: 'user',
        userName: name,
        image: imageUrl,
        password: pw,
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
        alert("User successfully registered!")
        navigate('/', { replace: true });
      });
    }
  }

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
                <input type="password" ref={pass} placeholder="Password" className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none"/>
              </div>
              <div>
                <input type="password" ref={repass} placeholder="Re-enter Password" className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none"/>
              </div>
              <div>
                <input type="text" ref={user_name} placeholder="Username" className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none"/>
              </div>
              <button className="bg-mainColor justify-center items-center h-12 w-40 p-3 m-2 rounded-lg cursor-pointer outline-none">
                Sign Up
              </button>
            </form>
        </div>

      </div>
    </div>
  </div>
  )
}

export default SignUp