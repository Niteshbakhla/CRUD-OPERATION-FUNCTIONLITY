import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='flex sticky top-0 left-0 right-0 justify-center items-center gap-10 text-1xl font-semibold shadow-md py-6 backdrop-blur-lg'>
            <Link className='  active:scale-[0.9] leading-tight ' to="/">Home</Link>
            <Link className='  active:scale-[0.9] leading-tight ' to="/createBlog">Create</Link>
        </nav>
    )
}

export default Navbar