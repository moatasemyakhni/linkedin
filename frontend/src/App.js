import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import navLogo from './assets/images/logo/nav-logo.png';
import heroImage from './assets/images/cover/hero-cover.svg';
import Login from './components/Login';
import UserLanding from './components/users/UserLanding';
import UserSignup from './components/users/UserSignup';
import { useEffect, useState } from 'react';

function App() {
  const [at_form, set_at_form] = useState(true);

  useEffect(() => {
    set_at_form(true);
  }, []);

  return (
    <BrowserRouter>
      <div className='px-3'>
        <Navbar navLogo={navLogo} at_form={at_form} />
      <Routes>
        <Route path='/' element={<Login set_at_form={set_at_form} img={heroImage} />}/>
        
      </Routes>

      <Routes>
        {/* <Navbar navLogo={navLogo} /> */}
        <Route path='/users' element={<UserLanding set_at_form={set_at_form} img={heroImage} />}/>
        <Route path='/signup/user' element={<UserSignup />}/>
      </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
