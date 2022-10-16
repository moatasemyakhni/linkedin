import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Navbar at_form={true} />
      </div>
    </BrowserRouter>
  );
}

export default App;
