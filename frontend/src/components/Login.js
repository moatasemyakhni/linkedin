import { useState } from 'react'

const Login = ({img}) => {
    const [showEmailLabel, setShowEmailLabel] = useState(false);
    const [showPasswordLabel, setShowPasswordLabel] = useState(false);

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

  return (
    <section>
        
        <div className='flex flex-col gap-4 md:flex-row md:gap-2'>
            <form className='flex flex-col gap-3 text-black/60 md:flex-1'>
                <h1 className='text-3xl py-4 font-light'>Join the biggest professional community</h1>
                <div className='flex flex-col border pl-1'>
                    {showEmailLabel? (
                        <label className='tex text-xs' htmlFor='email'>Email</label>
                    ): (
                        <label htmlFor='email' className='text-xs'>&nbsp;</label>
                    )
                    }
                    <input 
                        type='email'
                        placeholder='Email'
                        id='email'
                        onFocus={() => setShowEmailLabel(true)}
                        onBlur={(e) => hideEmailLabel(e.target.value)}
                        className=" outline-none h-7"
                        />
                </div>
                <div className='flex flex-col border pl-1'>
                    {showPasswordLabel? (
                        <label className='tex text-xs' htmlFor='password'>Password</label>
                    ): (
                        <label htmlFor='password' className='text-xs'>&nbsp;</label>
                    )
                    }
                    <input 
                        type='password'
                        placeholder='Password'
                        id='password'
                        onFocus={() => setShowPasswordLabel(true)}
                        onBlur={(e) => hidePasswordLabel(e.target.value)}
                        className=" outline-none h-7"
                        />
                </div>
                
                <p className='text-sm text-justify'>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</p>
                <button className='rounded-full bg-blue-700 text-white p-4 text-xl hover:bg-blue-900'>Agree & Join</button>
            </form>
            <div className='flex flex-1'>
                <img className='md:flex-1 flex' src={img} alt="React Logo" />
            </div>
        </div>
    </section>
  )
}

export default Login