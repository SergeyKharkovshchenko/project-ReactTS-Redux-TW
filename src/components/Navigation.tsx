import React from 'react'
import {Link} from 'react-router-dom'

export function Navigation() {
  return (
// flex justify-between
//items-center
//h-[50px] = height 
//px-5 = horizontal padding
//shadow-md = box shadow
//bg-gray-500 = background
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <h3 className="font-bold">Github Search</h3>

      <span>
{/*mr-2 = margin right 2px*/}
        <Link to="/" className="mr-2">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </span>
    </nav>
  )
}