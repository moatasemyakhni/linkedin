import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import navLogo from './assets/images/logo/nav-logo.png';
import shortNavLogo from './assets/images/logo/short-nav-logo.svg';
import heroImage from './assets/images/cover/hero-cover.svg';
import Login from './components/Login';
import UserLanding from './components/users/UserLanding';
import UserSignup from './components/users/UserSignup';

function App() {

  return (
    <BrowserRouter>
      <div className='px-3'>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar navLogo={navLogo} at_form={true} />
            <Login img={heroImage} />
          </>}
        />

        <Route path='/signup/user' element={
          <>
            <Navbar navLogo={navLogo} at_form={true} />
            <UserSignup />
          </>}
        />

        <Route path='/users' element={
          <>
            <Navbar navLogo={shortNavLogo} />
            <UserLanding img={heroImage} />
          </>
          }
        />

      </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
