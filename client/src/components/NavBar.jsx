import React, { useState,  Fragment  } from 'react';
//import { Button } from './Button';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Menu, Transition } from "@headlessui/react"
import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge";
import userRojo from './img/userRojo.jpg';
import notificacion from './img/notificacion.png'

// const StyledButton = styled(IconButton)`
//   position: fixed;
//   z-index: 100;
//   right: 0px;
//   top: 0px;
// `;


function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0(); 
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          SHARERIDES
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
         
          <li>
          <Menu as="div" className="mt-1 mr-4 relative">
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 hidden md:inline-block icon icon-tabler icon-tabler-arrow-bar-right"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="20" y1="12" x2="10" y2="12" />
              <line x1="20" y1="12" x2="16" y2="16" />
              <line x1="20" y1="12" x2="16" y2="8" />
              <line x1="4" y1="4" x2="4" y2="20" />
            </svg>

            <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/panelNotificacion'
              className='nav-links'
              onClick={closeMobileMenu}  /// logo campanita?
            >  <img
            className="h-10 w-12 rounded-full "
            src={notificacion}
            alt="img not found"
          />
            </Link>
           
          </li>

            {isAuthenticated ? (
              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src={user?.picture}
                  alt="img not found"
                />
              </Menu.Button>
            ) : (
              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src={userRojo}
                  alt="img not found"
                />
              </Menu.Button>



            )}
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {isAuthenticated ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={`/settings`} //href={`/settings/${user_id}`}
                        className={classNames(
                          active ? "hover:bg-gray-700" : "",
                          "block px-4 py-2 text-sm text-white"
                        )}
                      >
                        Panel de usuario
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          logout({ returnTo: window.location.origin })
                        }
                        className={classNames(
                          active ? "hover:bg-gray-700" : "",
                          "block px-4 py-2 text-sm text-white"
                        )}
                      >
                        Cerrar sesion
                      </button>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => loginWithRedirect()}
                      className={classNames(
                        active ? "hover:bg-gray-700" : "",
                        "block px-4 py-2 text-sm text-white"
                      )}
                    >
                      Iniciar sesion / registrarse
                    </button>
                  )}
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
          </li>
         
         
        </ul>
        
      </nav>
    </>
  );
}

export default Navbar;