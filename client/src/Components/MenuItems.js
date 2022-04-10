import React from 'react';
import { Link } from 'react-router-dom';
import { Close } from '@material-ui/icons';


const MenuItems = ({showMenu,active}) => {
  return (
                <ul className={active ? 'flex-col flex items-center fixed inset-0 left-1/4 uppercase bg-black backdrop-blur-lg gap-8 justify-center p-8 md:hidden' : 'hidden'}>
                    <Close onClick={showMenu} className='cursor-pointer'/>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/team'>Team</Link></li>
                    <li><Link to='/'>Contact</Link></li>
                </ul>
  );
};

export default MenuItems;