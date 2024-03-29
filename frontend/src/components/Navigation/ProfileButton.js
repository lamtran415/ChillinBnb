import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";
import CreateNewSpot from '../SpotForm/CreateSpot'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.logout())
    .then(closeMenu())
    // .then(history.push('/'))

  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button className="user-button" onClick={openMenu}>
          <i className="fa fa-bars fa-lg"></i>
          <i className="fas fa-user-circle fa-2x" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-menu-items">
            <li style={{cursor:'default', color: "rgb(255, 56, 92)", fontWeight: "bold"}}>Hello, {user.firstName}!</li>
            <li className="user-logout-button" onClick={() => {closeMenu(); history.push('/spots/current')}}>Manage listings</li>
            <li className="user-logout-button" onClick={() => {closeMenu(); history.push('/bookings/current')}}>Trips</li>
            <OpenModalMenuItem
                className="user-logout-button"
                itemText={`Host a spot`}
                onItemClick={closeMenu}
                modalComponent={<CreateNewSpot />}
            />
            {/* <li style={{cursor:'default'}}>{user.firstName} {user.lastName}</li>
            <li style={{cursor:'default'}}>{user.email}</li> */}
              <div
                className="user-logout-button logout-btn"
                onClick={logout}
              >Log Out</div>
          </div>
        ) : (
          <div className="modal-menu-items">
            <OpenModalMenuItem
              className='login-menu'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className='signup-menu'
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </ div>
  );
}

export default ProfileButton;
