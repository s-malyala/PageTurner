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

const WilliamShakespeare = () => {

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
      <div className="hidden md:flex h-full flex-initial">
        <Sidebar user={user && user}/>
      </div>
            <div className="flex flex-col">
              <img
                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                src="https://media.vanityfair.com/photos/55c8b14f8fbf768838dc6f86/16:9/w_1280,c_limit/t-shakespeare-pot-smoker.jpg"
                alt="user-pic"
              />
              <h1 className="font-bold text-3xl text-center mt-3 pt-5">
                William Shakespeare
              </h1>
              <h3 className='text-justify p-5'>William Shakespeare (bapt. 26 April 1564 – 23 April 1616) was an English playwright, poet and actor. He is widely regarded as the greatest writer in the English language and the world's pre-eminent dramatist.He is often called England's national poet and the "Bard of Avon" (or simply "the Bard"). His extant works, including collaborations, consist of some 39 plays, 154 sonnets, three long narrative poems, and a few other verses, some of uncertain authorship. His plays have been translated into every major living language and are performed more often than those of any other playwright. He remains arguably the most influential writer in the English language, and his works continue to be studied and reinterpreted.</h3>
              
              <div items-left>
                <h2 className="font-bold text-xl text-left mt-3 pl-5">Famous works:</h2>
                <ul className="p-5">
                  <li>The Merchant of Venice</li>
                  <li>A Midsummer Night’s Dream</li>
                  <li>Twelfth Night</li>
                  <li>Romeo and Juliet</li>
                  <li>Macbeth</li>

                </ul>
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

export default WilliamShakespeare