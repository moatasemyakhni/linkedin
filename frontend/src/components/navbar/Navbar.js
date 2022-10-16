import { Link } from 'react-router-dom';
import navLogo from '../../assets/images/logo/nav-logo.png';


const Navbar = ({at_form}) => {
  return (
    <header className="w-full flex justify-between flex-wrap gap-2 pt-1">
    <div className='w-20 cursor-pointer'>
        <Link to={"/"}>
            <img className='mx-3' src={navLogo} alt="linkedin logo" />
        </Link> 
    </div>
    <div className='my-auto'>
    { at_form? (
        <ul className='flex gap-5 mx-3 '>
            <Link to={"/"}><button className='text-lg p-2 border-hidden hover:border hover:rounded-full hover:bg-gray-100'>Join now</button></Link>
            <Link to={"/"}><button className='text-lg text-blue-700 border-blue-700 p-2 border rounded-full hover:bg-blue-100/40'>Sign in</button></Link>
        </ul>
    ):(
        <h1>Hello me</h1>
    )
    }
    </div>
    </header>
  )
}

export default Navbar