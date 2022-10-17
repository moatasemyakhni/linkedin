import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getUserInfo} from '../../api/usersApi';


const UserLanding = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
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
      data.first_name = info.first_name;
      data.last_name = info.last_name;
      data.country = info.country;
      data.city = info.city;
      data.headline = info.headline;
      data.phone = info.phone;
      data.profile = info.profile;
      data.follow_company = info.follow_company;
      setUserData(data);
    } catch(err) {
      navigate('/');
    }
  }

  useEffect(() => {
    getUser(localStorage.getItem('user_token'));
}, []);


  return (
    <div>UserLanding</div>
  )
}

export default UserLanding