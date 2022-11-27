import React from 'react'
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

const ForgotPassword = () => {
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
        </div>

        
      </div>
    </div>
  </div>
  )
}

export default ForgotPassword