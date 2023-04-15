import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

// Initial state of the 4 icons on top left of the Navbar
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

//  Usually, inside a CONTEXT PROVIDER  you return StateContextProvider
//  ANd the most important thing := the value property
// Second most important thing   := you always pass the {childrn prop} inside <----
//                                                        whatever you wrap your context with, whatever is inside of it will be displayed
export const ContextProvider = ({ children }) => {

//use  useState snippet from Intellisense
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

    

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  // whatever 'value' you pass here will be passed to 
  // ALL OF THE COMPONENTS IN THE ENTIRE APPLICATION
  return (
    <StateContext.Provider 
    // Value is an object (js object i.e the dictionary thing)
    /*

    VERY IMPORTANT CONCEPT =
    obj = {
      a : a,
      b : b,
      c : c
    }

    obj = {
      a,b,c
    }
    
    Easier syntax since key and value are same.
    */
    value={{  currentColor, 
              currentMode,
              activeMenu,
              screenSize, 
              setScreenSize, 
              handleClick, 
              isClicked, 
              initialState, 
              setIsClicked, 
              setActiveMenu, 
              setCurrentColor, 
              setCurrentMode, 
              setMode, 
              setColor, 
              themeSettings, 
              setThemeSettings }}>

      {children}
      
    </StateContext.Provider>
  );
};

// function that pass the CALL to useContext but we pass in the the StateContext
export const useStateContext = () => useContext(StateContext);
