import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, editProfile } from '../../api/usersApi'
import Button from '../form/Button';
import { getCompanyInfo, editLogo } from '../../api/companyApi';


const CompanyProfile = () => {
    const navigate = useNavigate();
    const [companyData, setCompanyData] = useState({
        _id: '',
        name: '',
        email: '',
        industry: '',
        logo: '',
        organizationSize: '',
        tagline: '',
        type: '',
        website: '',
      })
      const getCompany = async (token) => {
        try {
          const info = await getCompanyInfo(token);
          if(!info.company) {
            navigate('/');
          }
          const data = {};
          data._id = info._id;
          data.name = info.name;
          data.email = info.email;
          data.industry = info.industry;
          data.logo = info.logo;
          data.organizationSize = info.organizationSize;
          data.tagline = info.tagline;
          data.type = info.type;
          data.website = info.website;
          setCompanyData(data);
        } catch(err) {
          navigate('/');
        }
      }
    
      useEffect(() => {
        getCompany(localStorage.getItem('company_token'));
      }, []);

      const changeLogo = (e) => {
        const newImage = e.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', async () => {
            const finalImage = reader.result;
            const data = {};
            data._id = companyData._id;
            data.logo = finalImage;
            try {
                await editLogo(data, localStorage.getItem('company_token'));
                await getCompany(localStorage.getItem('company_token'));
            }catch(err) {
                return;
            }
        })

        reader.readAsDataURL(newImage); 
      }

      const logout = () => {
        localStorage.setItem('company_token', null);
        getCompany(localStorage.getItem('company_token'));
      }
  return (
    <div className='h-screen bg-gray-200 p-5'>
        <div>
            <label htmlFor='profile' className=''><img src={companyData.logo} className="block rounded-1/2 mx-auto object-fill" alt='company profile'/></label>
            <input 
                type='file'
                className='w-0'
                id='profile'
                onChange={(e) => changeLogo(e)}
            />
        </div>
      <div className='flex justify-center'>
        <Button text={'logout'} onClick={logout} />
      </div>
    </div>
  )
}

export default CompanyProfile