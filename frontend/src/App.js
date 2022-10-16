import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import navLogo from './assets/images/logo/nav-logo.png';
import heroImage from './assets/images/cover/hero-cover.svg';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <div className='px-3'>
          <Navbar navLogo={navLogo} at_form={true} />
      <Routes>
        <Route path='/' element={<Login img={heroImage} />}/>
        {/* <Route path='/signup/company' element={<CompanySignup img={heroImage} />}/> */}
      </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
