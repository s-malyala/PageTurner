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

const JKRowling = () => {

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
                src="https://images.bauerhosting.com/legacy/media/5d72/5a07/ddd8/9c1f/5ede/ccbd/jk-rowling.jpg?format=jpg&quality=80&width=960&height=540&ratio=16-9&resize=aspectfill"
                alt="user-pic"
              />
              <h1 className="font-bold text-3xl text-center mt-3 pt-5">
                J. K. Rowling
              </h1>
              <h3 className='text-justify p-5'>Joanne Rowling (born 31 July 1965), also known by her pen name J. K. Rowling, is a British author and philanthropist. She wrote Harry Potter, a seven-volume children's fantasy series published from 1997 to 2007. The series has sold over 500 million copies, been translated into at least 70 languages, and spawned a global media franchise including films and video games. The Casual Vacancy (2012) was her first novel for adults. She writes Cormoran Strike, an ongoing crime fiction series, as Robert Galbraith.</h3>
              
              <div items-left>
                <h2 className="font-bold text-xl text-left mt-3 pl-5">Famous works:</h2>
                <ul className="p-5">
                  <li>Harry Potter and the Sorcerer’s Stone</li>
                  <li>Harry Potter and the Chamber of Secrets</li>
                  <li>Harry Potter and the Prisoner of Azkaban</li>
                  <li>Harry Potter and the Goblet of Fire</li>
                  <li>Harry Potter and the Order of the Phoenix</li>

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

export default JKRowling