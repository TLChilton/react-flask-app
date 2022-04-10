import { MenuOutlined } from '@material-ui/icons';
import React,{useState} from 'react';
import { Link, parsePath } from 'react-router-dom';
import MenuItems from './MenuItems';

const Header = () => {

    const [active,setActive] = useState(false)

    const showMenu = () => {
        setActive(!active)
    }

  return (
    <div className='text-white'>
        <nav class="bg-white border-gray-200 sm:px-3 py-2.5 rounded dark:bg-gray-800">
        <div class=" text-white-100 container flex flex-wrap justify-between items-center mx-auto">
        <a href="https://www.paypal.com/" class="flex items-center">
        <img src={require("./assets/pp.png")} class="mr-3 h-6 sm:h-9" alt="Paypal Logo" />
              <span class="self-center text-xl font-semibold whitespace-nowrap text-white">Paypal</span>
          </a>
          <div class="flex md:order-2">
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Try our model</button>
              
          </div>
            <div className='absolute text-white right-6 md:hidden top-6 scale-150'>
                <MenuOutlined onClick={showMenu} className='scale-150 cursor-pointer'/>
            </div>

                <ul className='text-white md:flex gap-8 p-6 uppercase text-xl font-semibold whitespace-nowrap text-white flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
                    <li className='text-white'><Link to='/'>Home</Link></li>
                    <li><Link to='/team'>Team</Link></li>
                    <a target="_blank" href = "https://github.com/spewmaker/react-flask-app">GitHub</a>
                    <li><Link to='/'>Contact</Link></li>
                </ul>

                <MenuItems showMenu={showMenu} active={active}/>
            </div>

        </nav>

    </div>
  );
};

export default Header;
