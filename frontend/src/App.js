import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import navLogo from './assets/images/logo/nav-logo.png';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Navbar navLogo={navLogo} at_form={true} />
      </div>
    </BrowserRouter>
  );
}

export default App;
