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

const AgathaChristie = () => {

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
                src="https://images.metadata.sky.com/pd-image/48586e2f-d44f-45b1-bffb-ed830400a85b/16-9"
                alt="user-pic"
              />
              <h1 className="font-bold text-3xl text-center mt-3 pt-5">
                Agatha Christie
              </h1>
              <h3 className='text-justify p-5'>Dame Agatha Mary Clarissa Christie, Lady Mallowan, (15 September 1890 – 12 January 1976) was an English writer known for her 66 detective novels and 14 short story collections, particularly those revolving around fictional detectives Hercule Poirot and Miss Marple. She also wrote the world's longest-running play, the murder mystery The Mousetrap, which has been performed in the West End since 1952. A writer during the "Golden Age of Detective Fiction", Christie has been called the "Queen of Crime". She also wrote six novels under the pseudonym Mary Westmacott. In 1971, she was made a Dame (DBE) by Queen Elizabeth II for her contributions to literature. Guinness World Records lists Christie as the best-selling fiction writer of all time, her novels having sold more than two billion copies.</h3>
              
              <div items-left>
                <h2 className="font-bold text-xl text-left mt-3 pl-5">Famous works:</h2>
                <ul className="p-5">
                  <li>The Murder of Roger Ackroyd</li>
                  <li>Peril at End House</li>
                  <li>Murder on the Orient Express</li>
                  <li>The ABC Murders</li>
                  <li>And Then There Were None</li>

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

export default AgathaChristie