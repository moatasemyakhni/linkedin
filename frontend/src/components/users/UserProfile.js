import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, editProfile } from '../../api/usersApi'
import Button from '../form/Button';

const UserProfile = () => {
    const navigate = useNavigate();
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

      const changeProfile = (e) => {
        const newImage = e.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', async () => {
            const finalImage = reader.result;
            const data = {};
            data._id = userData._id;
            data.profile = finalImage;
            try {
                await editProfile(data, localStorage.getItem('user_token'));
                await getUser(localStorage.getItem('user_token'));
            }catch(err) {
              console.log(err);
                return;
            }
        })

        reader.readAsDataURL(newImage); 
      }

      const logout = () => {
        localStorage.setItem('user_token', null);
        getUser(localStorage.getItem('user_token'));
      }
  return (
    <div className='h-screen bg-gray-200 p-5'>
        <div>
            <label htmlFor='profile' className=''><img src={userData.profile} className="block rounded-1/2 mx-auto object-fill" alt='user profile'/></label>
            <input 
                type='file'
                className='w-0'
                id='profile'
                onChange={(e) => changeProfile(e)}
            />
        </div>
      <div className='flex justify-center'>

      <Button text={'logout'} onClick={logout} />
      </div>
    </div>
  )
}

export default UserProfile