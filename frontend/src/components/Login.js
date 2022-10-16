import React from 'react'

const Login = ({img}) => {
  return (
    <section>
        <h1 className='text-3xl py-4'>Join the biggest professional community</h1>
        <div>
            <form>
                <input type='email' placeholder='email' />
                <input type='password'/>
                <p>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</p>
                <button>Agree & Join</button>
            </form>
            <img src={img} alt="React Logo" />
        </div>
    </section>
  )
}

export default Login