import { Link } from 'react-router-dom';


const Navbar = ({navLogo, at_form}) => {
  return (
    <header className="w-full flex justify-between flex-wrap gap-2 pt-1">
    <div className='w-20 cursor-pointer md:w-40'>
        <Link to={"/"}>
            <img src={navLogo} alt="linkedin logo" />
        </Link> 
    </div>
    <div className='my-auto'>
    { at_form? (
        <ul className='flex gap-5 '>
            <Link to={"/signup/company"}><button className='text-lg p-2 border-hidden hover:border hover:rounded-full hover:bg-gray-100'>Post Job</button></Link>
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