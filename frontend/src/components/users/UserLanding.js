import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getUserInfo, follow, unFollow, getUnfollowedCompanies} from '../../api/usersApi';

const UserLanding = () => {
  const navigate = useNavigate();
  const [unFollowedCompany, setUnFollowedCompany] = useState([]);
  const [userData, setUserData] = useState({
    _id: '',
    first_name: '',
    last_name: '',
    country: '',
    city: '',
    headline: '',
    phone: '',
    profile: '',
    follow_company: [],
  })
  const getUser = async (token) => {
    try {
      const info = await getUserInfo(token);
      if(!info.user) {
        navigate('/');
      }
      const data = {};
      data._id = info._id;
      data.first_name = info.first_name;
      data.last_name = info.last_name;
      data.country = info.country;
      data.city = info.city;
      data.headline = info.headline;
      data.phone = info.phone;
      data.profile = info.profile;
      data.follow_company = info.follow_company;
      setUserData(data);
      console.log(data)
    } catch(err) {
      navigate('/');
    }
  }

  useEffect(() => {
    getUser(localStorage.getItem('user_token'));
  }, []);

  useEffect(() => {
    getCompanies();
  }, [userData]);

  const insertFollow = () => {
    console.log("follow")
    //follow();
  }

  const insertUnFollowed = () => {
    console.log("unfollow")
   // unFollow();
  }

  const getCompanies = async () => {
    try {
      const data = {user_id: userData._id};

      const companies = await getUnfollowedCompanies(data);  
      setUnFollowedCompany(companies);
    }catch(err) {
      console.log("err", err)
    }
  }
  return (
    <div className='bg-gray-100 h-screen p-1'>
      
        {
          unFollowedCompany.map((value) => {
            return <div className='w-4/5 mx-auto bg-white p-3 rounded-md shadow-lg my-2 flex gap-3 justify-between'>
                <div className='flex flex-wrap self-center gap-2'>
                <img src={value.logo} className="w-7 h-7" alt='company logo' />
                      <p className='text-lg'>{value.name}<span className='pl-1 text-[10px] text-blue-300'>{value.organizationSize}+</span></p>
                      
                </div>
                <div>
                  <button className='p-4 bg-blue-300 rounded-lg text-white hover:bg-blue-700'
                  onClick={
                    userData.follow_company.includes(value._id)? (
                      (e) => {

                        insertUnFollowed(e)
                      }
                    ): (
                      (e) => {
                        insertFollow(e)
                      }
                    )
                  }>{
                    userData.follow_company.includes(value._id)? "UnFollow": "Follow"
                  }</button>
                </div>
                    </div>
            })
        }  
    </div>
  )
}

export default UserLanding;