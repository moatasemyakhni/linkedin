import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import navLogo from './assets/images/logo/nav-logo.png';
import shortNavLogo from './assets/images/logo/short-nav-logo.svg';
import heroImage from './assets/images/cover/hero-cover.svg';
import Login from './components/Login';
import UserLanding from './components/users/UserLanding';
import UserSignup from './components/users/UserSignup';
import CompanySignup from './components/companies/CompanySignup';
import CompanyLanding from './components/companies/CompanyLanding';
import UserProfile from './components/users/UserProfile'
import CompanyProfile from './components/companies/CompanyProfile';
import CompanyApplicants from './components/companies/CompanyApplicants';

function App() {

  return (
    <BrowserRouter>
      <div className='px-3'>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar users={''} navLogo={navLogo} at_form={true} />
            <Login img={heroImage} />
          </>}
        />

        <Route path='/signup/user' element={
          <>
            <Navbar users={''} navLogo={navLogo} at_form={true} />
            <UserSignup />
          </>}
        />

        <Route path='/users' element={
          <>
            <Navbar users={'users'} navLogo={shortNavLogo} />
            <UserLanding />
          </>
          }
        />

        <Route path='/users/profile' element={
          <>
            <Navbar users={'users'} navLogo={shortNavLogo} />
            <UserProfile />
          </>
          }
        />

        <Route path='/signup/company' element={
          <>
            <Navbar at_form={true} navLogo={navLogo} />
            <CompanySignup /> 
          </>
        }
        />
        
        <Route path='/companies' element={
          <>
            <Navbar companies={'companies'} navLogo={shortNavLogo} />
            <CompanyLanding /> 
          </>
          }
        />

        <Route path='/companies/profile' element={
          <>
            <Navbar companies={'companies'} navLogo={shortNavLogo} />
            <CompanyProfile /> 
          </>
          }
        />
        
        <Route path='/companies/applicants' element={
          <>
            <Navbar companies={'companies'} navLogo={shortNavLogo} />
            <CompanyApplicants /> 
          </>
          }
        />
      </Routes>

      
      
      </div>
    </BrowserRouter>
  );
}

export default App;
