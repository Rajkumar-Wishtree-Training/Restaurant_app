import React from 'react'
import veg from '../images/veg.png'
import nonveg from '../images/nonveg.png'

function MenuCard({ menu }) {
  return (
    <div className='menuCard'>
      <img src={menu.images} alt={menu.name} />
      <p>
        {menu.name}
        {menu.diet === 'veg' ? <img className='dietLogo' src={veg} alt="" /> : <img className='dietLogo' src={nonveg} alt="" />}
      </p>
      <h5>
        {menu.category}
      </h5>
      <div>
        {menu.description}
      </div>
      <span>
      ₹{menu.price}
      </span>
    </div>
  )
}

export default MenuCard
