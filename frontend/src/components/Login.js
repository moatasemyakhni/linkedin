import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {userLogin, getUserInfo} from '../api/usersApi';
import {companyLogin, getCompanyInfo} from '../api/companyApi';
import FormInput from './form/FormInput';

const Login = ({img}) => {
    const [showEmailLabel, setShowEmailLabel] = useState(false);
    const [showPasswordLabel, setShowPasswordLabel] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();


    const hideEmailLabel = (value) => {
        if(!value) {
            setShowEmailLabel(false);
            return;
        }
        setShowEmailLabel(true);
    }

    const hidePasswordLabel = (value) => {
        if(!value) {
            setShowPasswordLabel(false);
            return;
        }
        setShowPasswordLabel(true);
    }

    const focusOnInput = (setShowLabel) => {
        setIsError(false);
        setShowLabel(true);
    }
    const login = async (e) => {
        e.preventDefault();
        setDisable(true);
        const data = {
            email: email,
            password: password,
        }
        try {
            const token = await userLogin(data);
            localStorage.setItem('user_token', token.data.token);

            const info = await getUserInfo(token.data.token);
            if(info.user) {
                setDisable(false);
                navigate('/users');
            }
        }catch(err) {
            try {
                setDisable(true);
                const token = await companyLogin(data);
                localStorage.setItem('company_token', token.data.token);
    
                const info = await getCompanyInfo(token.data.token);
                if(info.company) {
                    navigate('/companies');
                }
            }catch (err) {
                setDisable(false);
                setIsError(true);
                setErrorMessage(err.response.data.message);
            }
        }
    }

  return (
    <section>   
        <div className='flex flex-col gap-4 md:flex-row md:gap-2'>
            <form onSubmit={login} className='flex flex-col gap-3 text-black/60 md:flex-1'>
                <h1 className='text-3xl py-4 font-light'>Join the biggest professional community</h1>
                {isError? (
                    <div className='h-6'>
                        <p className='text-red-500 text-lg text-center'>{errorMessage}</p>
                    </div>
                ):(
                    <div className='h-6'></div>
                )}
                <FormInput 
                    showLabel={showEmailLabel}
                    setShowLabel={setShowEmailLabel}
                    hideLabel={hideEmailLabel}
                    setInput={setEmail}
                    focusOnInput={focusOnInput}
                    text={"Email"}
                    />

                <FormInput 
                    showLabel={showPasswordLabel}
                    setShowLabel={setShowPasswordLabel}
                    hideLabel={hidePasswordLabel}
                    setInput={setPassword}
                    focusOnInput={focusOnInput}
                    text={"Password"}
                    />
                
                <p className='text-sm text-justify'>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</p>
                <button disabled={disable? true: false} className={`rounded-full bg-blue-700 text-white p-4 text-xl hover:bg-blue-900 ${disable? 'cursor-not-allowed bg-blue-700/60 hover:bg-blue-700/60': 'cursor-pointer'}`}>Agree & Join</button>
                <p className='text-center'>New to LinkedIn? <Link to={"/signup/user"}><span className='text-blue-700 hover:underline'>Sign up</span></Link></p>
            </form>
            <div className='flex flex-1'>
                <img className='md:flex-1 flex' src={img} alt="React Logo" />
            </div>
        </div>
    </section>
  )
}

export default Login