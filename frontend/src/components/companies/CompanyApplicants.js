import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompanyInfo } from "../../api/companyApi";
import { getApplicants } from "../../api/postsApi";



const CompanyApplicants = () => {
    const navigate = useNavigate();
    
    const [company_id, setCompany_id] = useState('');
    const [users, setUsers] = useState([]);
    const getCompany = async (token) => {
      try {
        const info = await getCompanyInfo(token);
        if(!info.company) {
          navigate('/');
        }
        setCompany_id(info._id);
      } catch(err) {
        navigate('/');
      }
    }

  useEffect(() => {
      getCompany(localStorage.getItem('company_token'));
    }, []);

    useEffect(() => {
        
      getCompanyApplicants(localStorage.getItem('company_token'));
    }, [company_id]);

    const getCompanyApplicants = async (token) => {
        if(!company_id || company_id == '') return;
        try {
            const usrs = await getApplicants({id: company_id}, token);
            setUsers(usrs);
        }catch(err) {
            return;
        }
    }
  return (
    <div className='bg-gray-100 h-screen p-1'>
        
        <h1>HR</h1>
        {
          users.map((value, i) => {
            return (
            value.applied_users.map((user, j) => {
                 return (
                    <div key={j} className='w-4/5 mx-auto bg-white p-3 rounded-md shadow-lg my-2 flex gap-3 justify-between'>
                        
                        <div className='flex flex-wrap self-center gap-2'>
                        <img src={user.profile} className="w-7 h-7" alt='company logo' />
                            <p className='text-lg'>{`${user.first_name} ${user.last_name}`}<span className='pl-1 text-[10px] text-blue-300'>{user.email}</span></p>   
                        </div>

                        <div>
                            <p>{value.content}</p>
                        </div>
                    </div>
                    )
                })
                )
            })
        }  
    </div>
  )
}

export default CompanyApplicants