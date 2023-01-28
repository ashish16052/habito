import React from 'react'
import habito from '../../assets/habito.svg'
import './Nav.scss'

const Nav = () => {
  return (
    <div className='nav'>
        <div className='banner'>
            <img src={habito} className='logo'/>
            <h1>Habito</h1>
        </div>
        <div className='sign'>
            Sign in
        </div>
    </div>
  )
}

export default Nav