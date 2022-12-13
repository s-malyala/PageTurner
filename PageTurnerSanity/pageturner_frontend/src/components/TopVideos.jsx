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

const TopVideos = () => {

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
        <div className="flex flex-col items-center">
            <div className='flex pl-20 items-center'>
                <div className='p-10'>
                    <iframe width="480" height="270" src="https://www.youtube.com/embed/XtEn9NsSODQ" title="Agatha Christie" frameborder="10" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div className='p-10'>
                    <iframe width="480" height="270" src="https://www.youtube.com/embed/zU7OgLjA5zk" title="5 Life-changing books YOU MUST READ in 2022" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                
            </div>
            <div className='flex pl-20 items-center'>
                <div className='p-10'>
                <iframe width="480" height="270" src="https://www.youtube.com/embed/ILmvKC-H1l0" title="Books You NEED to Read in 2022 *my favorite books that you'll LOVE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div className='p-10'>
                <iframe width="480" height="270" src="https://www.youtube.com/embed/RBClrFGb3Mk" title="A Beginners Guide To Reading Shakespeare (For FUN)!!! 2020" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

export default TopVideos