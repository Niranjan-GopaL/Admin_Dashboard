import React from 'react';
// Link and NavLink allows us to switch between pages
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy';
import { useStateContext } from '../context/ContextProvider';

// the data that if the Sidebar is active comes from stateContext but initially we'll
// use a static variable set to true and code it out and LATER WE'LL MAKE IT DYNAMIC
const Sidebar = () => {

  // THIS IS A HOOK
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  // Just an arrow function to CLOSE THE SIDEBAR if screenSize is less than
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';







  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (
      <>
      <div className='flex justify-between items-center'>


        <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
          <SiShopware /> <span>Shoppy</span>
        </Link>

        <TooltipComponent content='Menu' position='BottomCenter'> 
          <button type="button" onClick={() => setActiveMenu( (prevActiveMenu)  => !prevActiveMenu)}
          // something is wrong here
            className="text-xt rounded-full " 
            >
            <MdOutlineCancel />
          </button>
        </TooltipComponent>
      </div>


      <div className='mt-10'>
        {links.map((item)=> (
          <div key={item.title}>
            <p className='text-gray-400 m-3 mt-4 uppercase'>
            {item.title}
            </p>

            {/* there is an important reason why we are handleCLoseSideBar-ing here :-
                   -  In mobile screens Sidebar normally covers most of the screen,
                   -  So we need to close the sidebar when the user select an option automatically,
                      and not have the user close the sidebar manually.
            */}
            {item.links.map((link)=> (
              <NavLink
                to={`${link.name}`}
                key={link.name}
                onClick={handleCloseSideBar}
                className={({ isActive }) => 
              isActive ? activeLink : normalLink}
              >
                {link.icon}
                <span className='capitalize'>
                  {link.name}
                </span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>


      </>
      )}
    </div>
  )
}

export default Sidebar
