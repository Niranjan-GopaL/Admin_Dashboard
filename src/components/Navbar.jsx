import { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../context/ContextProvider';


//EXTREMELY USEFUL SKILL :-
//  Since NavBar has soo many button we create a separate func for it

// Essentially a button wrapped around tool tip component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);






const Navbar = () => {

  // all these are coming from useStateContext function
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();


  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    // Whenever you attach an event listen to window, you'll also need to remove the event listener
    window.addEventListener('resize', handleResize); 
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // hides the sidebar automatically if the screen width of window is smaller than 900
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);


  const handleActiveMenu = () => setActiveMenu(!activeMenu);






// The AiOutlineMenu btton is one button.
// ALl other button are wrapped inside other button

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      {/* <NavButton title="Menu" customFunc={(prevActiveMenu) => !prevActiveMenu} color={currentColor} icon={<AiOutlineMenu />} /> */}

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />

    
      <div className="flex">

        {/* Buttons for :-  RiNotification3Line, BsChatLeft, FiShoppingCart */}
        <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} />
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />

        {/* For User Profile */}
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}>

            {/* Image of user's Profile */}
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"/>

            {/* Even the name of the user is statically types in */}
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
            </p>

            {/* THIS IS THE SMALL ARROW DOWN */}
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>


        {/* You need to render the Cart Component when we click on cart*/}
        {isClicked.cart && (<Cart />)}
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}

      </div>
    </div>
  );
};

export default Navbar;