import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';

import { userQuery } from '../utils/data';
import { client } from '../client';

import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';


import logo from '../assets/logo.png';

const DanBrown = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-full transition-height duration-75 ease-out">
      
      <div className="hidden md:flex h-full flex-auto">
        <Sidebar user={user && user}/>
      </div>
      <div className="pb-2 h-full">
        <div className="flex flex-col pb-5">
          <div className="flex flex-col mb-7">
            <div className="flex flex-col">
              <img
                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                src="https://media.vanityfair.com/photos/5f4e81e70ca7fe28f9ec3f04/16:9/w_2000,h_1125,c_limit/dan-brown-childrens-music.jpg"
                alt="user-pic"
              />
              <h1 className="font-bold text-3xl text-center mt-3 pt-5">
                Dan Brown
              </h1>
              <h3 className='text-justify p-5'>Daniel Gerhard Brown (born June 22, 1964) is an American author best known for his thriller novels, including the Robert Langdon novels. His novels are treasure hunts which usually take place over a period of 24 hours. They feature recurring themes of cryptography, art, and conspiracy theories. His books have been translated into 57 languages and, as of 2012, have sold over 200 million copies. Plenty of his books have been made into movies and television shows.</h3>
              
              <div items-left>
                <h2 className="font-bold text-xl text-left mt-3 pl-5">Famous works:</h2>
                <ul className="p-5">
                  <li>The Da Vinci Code</li>
                  <li>Deception Point</li>
                  <li>Angels & Demons</li>
                  <li>The Lost Symbol</li>
                  <li>Origin</li>

                </ul>
              </div>

              

            </div>
          </div>
        </div>
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
          
        </div>
      </div>
      
      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
          
          <Sidebar closeToggle={setToggleSidebar} user={user && user} />
        </div>
      )}
      </div>
  )

}

export default DanBrown