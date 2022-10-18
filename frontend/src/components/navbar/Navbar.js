import { Link } from 'react-router-dom';
import homeIcon from '../../assets/images/icons/home.svg';
import notificationIcon from '../../assets/images/icons/notification.svg';
import searchIcon from '../../assets/images/icons/search.svg';
import {getUserInfo} from '../../api/usersApi';
import { useEffect, useState } from 'react';
import { searchForJob, isApplied, applyJob } from '../../api/postsApi';
import Button from '../form/Button';
import { getCompanyInfo } from '../../api/companyApi';


const Navbar = ({navLogo, at_form, users, companies}) => {
    const [profile, setProfile] = useState('');
    const [user_id, setUser_id] = useState('');
    const [companyProfile, setCompanyProfile] = useState('');
    const [isSearchContent, setIsSearchContent] = useState(false);
    const [searchContent, setSearchContent] = useState([]);
    const [emptySearch, setEmptySearch] = useState(false);
    const getUser = async (token) => {
        const info = await getUserInfo(token);
        setProfile(info.profile);
        setUser_id(info._id);
    }

    const getCompany = async (token) => {
        const companyData = await getCompanyInfo(token);
        setCompanyProfile(companyData.logo);
    }
    useEffect(() => {
        getUser(localStorage.getItem('user_token'));
        getCompany(localStorage.getItem('company_token'))
    }, [users]);

    const getSearchedJobs = async (key) => {
        if(!key) {
            setSearchContent([]);
            setEmptySearch(false);
            setIsSearchContent(false);
            return;
        }
        try {
          const data = await searchForJob(key);
          if(data.length === 0) {
            
            setIsSearchContent(false);
            setEmptySearch(true);
            return;
          }
          setEmptySearch(false);
          setIsSearchContent(true);
          setSearchContent(data);

        }catch(err) {
            setEmptySearch(false);
            setIsSearchContent(false);
        }
    
      }
    
      const applyForJob = async (e, data, token) => {
        //data for post and user id
        try {
            const response = await applyJob(data, token);
            e.target.innerText = "Applied";
        }catch (err) {
            e.target.innerText = "Apply";
            
        }
      }
  return (
    <>
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
        <div className='cursor-pointer flex'>
            <Link to={`/${users}`}>
                <img src={navLogo} alt="linkedin logo" />
            </Link> 
            <input 
                id='search'
                className='p-2 border bg-blue-300 h-6 placeholder-white self-center'
                placeholder='search'
                onChange={(e) => getSearchedJobs(e.target.value)}/>
        </div>
        <div className='flex gap-3 items-center'>
            
           <Link to={'/users'}><img src={homeIcon} className="w-8 cursor-pointer
         " alt='home' /> </Link>
           <img src={notificationIcon} className="w-8 cursor-pointer
           " alt='notification' />
           <Link to={'/users/profile'}><img src={`${profile}`} className="w-8 h-11 rounded-1/2 object-fill cursor-pointer" alt='user profile'/></Link>
        </div>
    </>
    ): (
    companies?(
        <div className='w-full flex flex-wrap justify-between'>
            <Link to={`/${companies}`}>
                <img src={navLogo} alt="linkedin logo" />
            </Link> 

            <div className='flex gap-3 items-center'>
            
                <Link to={'/companies'}><img src={homeIcon} className="w-8 cursor-pointer
                " alt='home' /> </Link>
            
                <Link to={'/companies/profile'}><img src={`${companyProfile}`} className="w-8 h-11 rounded-1/2 object-fill cursor-pointer" alt='company profile'/></Link>
            </div>
        </div>
    ):(
        <h1>Page Not Found</h1>
    )
    )
    )
    }
    </header>
    {
        emptySearch?
        <div className=' relative top-0 left-0 w-full bg-white z-10 pt-2 pl-2 font-semibold md:w-3/4'>
            <p className='w-full my-3 bg-white p-3 shadow-md shadow-slate-900'>No results</p>
        </div>
        :isSearchContent?
        <div className=' relative top-0 left-0 w-full min-h-[300px] bg-white z-10 h-10 overflow-y-scroll pt-2 pl-2 font-semibold md:w-3/4'>{
            searchContent.map((v) => {
                return(<div className='flex w-full my-3 bg-white p-3 shadow-md shadow-slate-900 gap-3'>
                <p className='self-center'>{v.content}<span className='pl-1 text-xs'>[{v.company_id.name}]<br />{v.created_at.split('T')[0]}</span></p>
                <Button text={'Apply'} onClick={(e) => applyForJob(e, {post_id: v._id, user_id:user_id}, localStorage.getItem('user_token'))}/>
                </div>)
            })
        }
        </div>:
        <div></div>
    }
    </>
  )
}
export default Navbar