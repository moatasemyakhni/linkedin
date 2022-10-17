import { Link } from 'react-router-dom';
import homeIcon from '../../assets/images/icons/home.svg';
import notificationIcon from '../../assets/images/icons/notification.svg';
import searchIcon from '../../assets/images/icons/search.svg';
import {getUserInfo} from '../../api/usersApi';
import { useEffect, useState } from 'react';

const Navbar = ({navLogo, at_form, users, companies}) => {
    const [profile, setProfile] = useState('');
    const getUser = async (token) => {
        const info = await getUserInfo(token);
        setProfile(info.profile);
    }

    useEffect(() => {
        getUser(localStorage.getItem('user_token'));
    }, [users]);

  return (
    <header className="w-full flex justify-between flex-wrap gap-2 pt-1">
    
    { at_form? (
    <>
        <div className='w-20 cursor-pointer md:w-40'>
            <Link to={`/`}>
                <img src={navLogo} alt="linkedin logo" />
            </Link> 
        </div>
        <div className='my-auto'>
            <ul className='flex gap-5 '>
                <Link to={"/signup/company"}><button className='text-lg p-2 border-hidden hover:border hover:rounded-full hover:bg-gray-100'>Post Job</button></Link>
                <Link to={"/"}><button className='text-lg text-blue-700 border-blue-700 p-2 border rounded-full hover:bg-blue-100/40'>Sign in</button></Link>
            </ul>
        </div>
    </>
    ):(
    users?(
    <>
        <div className='w-20 cursor-pointer md:w-40'>
            <Link to={`/${users}`}>
                <img src={navLogo} alt="linkedin logo" />
            </Link> 
        </div>
        <div className='flex gap-3'>
           <img src={searchIcon} className="w-8 cursor-pointer
           " alt='search' /> 
           <img src={homeIcon} className="w-8 cursor-pointer
           " alt='home' /> 
           <img src={notificationIcon} className="w-8 cursor-pointer
           " alt='notification' />
           <img src={`${profile}`} className="w-8 rounded-full object-fill cursor-pointer" alt='user profile'/>
        </div>
    </>
    ): (
    companies?(
        <div className='w-20 cursor-pointer md:w-40'>
            <Link to={`/${companies}`}>
                <img src={navLogo} alt="linkedin logo" />
            </Link> 
        </div>
    ):(
        <h1>Page Not Found</h1>
    )
    )
    )
    }
    </header>
  )
}

export default Navbar