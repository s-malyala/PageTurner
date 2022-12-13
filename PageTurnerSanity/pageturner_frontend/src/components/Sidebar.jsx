import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/logo.png';
import { categories } from '../utils/data';
import { pages } from '../utils/data';
import { useParams, useNavigate, BrowserRouter } from 'react-router-dom';
import Iframe from 'react-iframe'


const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
  
  const navigate = useNavigate();

  const showWilliamShakespeare = () =>{
    navigate('/williamshakespeare', { replace: true });
  }

  const showAgathaChristie = () =>{
    navigate('/agathachristie', { replace: true });
  }

  const showJKRowling = () =>{
    navigate('/jkrowling', { replace: true });
  }

  const showDanBrown = () =>{
    navigate('/danbrown', { replace: true });
  }

  const showTopVideos = () =>{
    navigate('/topvideos', { replace: true });
  }

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-blue-100 h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
            <div className='justify-center items-center pl-4'>
              <button className="bg-green-200 justify-center items-center h-10 w-40 m-2 p-2 rounded-lg outline-none">        
                <h2 className='font-extrabold'>Genres</h2>
              </button>
            </div>
          {categories.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
              {category.name}
            </NavLink>
          ))}
            <div className='justify-center items-center pl-4'>
              <button className="bg-green-200 justify-center items-center h-10 w-40 m-2 p-2 rounded-lg outline-none">        
                <h2 className='font-extrabold'>Top Pages</h2>
              </button>
            </div>
          
          <form onSubmit={showWilliamShakespeare} >
            <div className='justify-center items-center pl-4'>
              <button className="bg-mainColor justify-center items-center h-10 w-40 m-2 p-2 rounded-lg cursor-pointer outline-none">        
                Shakespeare
              </button>
            </div>  
          </form>

          <form onSubmit={showAgathaChristie} >
            <div className='justify-center items-center pl-4'>
              <button className="bg-mainColor justify-center items-center h-10 w-40 m-2 p-2 rounded-lg cursor-pointer outline-none">        
                Agatha Christie
              </button>
            </div>  
          </form>

          <form onSubmit={showJKRowling} >
            <div className='justify-center items-center pl-4'>
              <button className="bg-mainColor justify-center items-center h-10 w-40 m-2 p-2 rounded-lg cursor-pointer outline-none">        
                J.K. Rowling
              </button>
            </div>  
          </form>

          <form onSubmit={showDanBrown} >
            <div className='justify-center items-center pl-4'>
              <button className="bg-mainColor justify-center items-center h-10 w-40 m-2 p-2 rounded-lg cursor-pointer outline-none">        
                Dan Brown
              </button>
            </div>  
          </form>

          <form onSubmit={showTopVideos} >
            <div className='justify-center items-center pl-4'>
              <button className="bg-red-200 justify-center items-center h-10 w-40 m-2 p-2 rounded-lg cursor-pointer outline-none">        
                <h2 className='font-extrabold'>Top Videos</h2>
              </button>
            </div>  
          </form>

        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;