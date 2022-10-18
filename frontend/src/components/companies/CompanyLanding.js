import FormInput from "../form/FormInput"
import { useEffect, useState } from "react";
import { getCompanyInfo } from "../../api/companyApi";
import { createPost } from "../../api/postsApi";

import { useNavigate } from "react-router-dom";


const CompanyLanding = () => {

    const navigate = useNavigate();
    const [company_id, setCompany_id] = useState('')
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


  const [showContentLabel, setShowContentLabel] = useState(false);
  const [content, setContent] = useState('');
  const [isError, setIsError] = useState(false);

  const hideContentLabel = (value) => {
          if(!value) {
              setShowContentLabel(false);
              return;
          }
          setShowContentLabel(true);
      }
  const focusOnInput = (setShowLabel) => {
        setIsError(false);
        setShowLabel(true);
    }

  const postJob = async (e) => {
    e.preventDefault();
    const data = {};
    data.company_id = company_id;
    data.content = content;
    try {
      const post = await createPost(data, localStorage.getItem('company_token'));
      setContent('');
    }catch(err) {
      return;
    }
  }
  return(
    <div>
      <h1 className="py-3 text-center text-blue-500 font-bold text-4xl">Create Job</h1>
      <form onSubmit={(e) => postJob(e)}>
        <FormInput 
          showLabel={showContentLabel}
          setShowLabel={setShowContentLabel}
          hideLabel={hideContentLabel}
          setInput={setContent}
          text="Content"
          focusOnInput={focusOnInput}
          type="text"
          value={content}
        />
        <button className="my-3 font-bold p-3 bg-blue-500 w-44 text-2xl text-white rounded-md border border-hidden mx-auto block hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-solid active:bg-blue-300">Post</button>
      </form>

    </div>
  )   
}
export default CompanyLanding