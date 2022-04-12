import React from 'react'
import veg from '../images/veg.png'
import nonveg from '../images/nonveg.png'

function MenuCard({ menu }) {
  return (
    <div className='menuCard'>
      <img src={menu.image.url} alt={menu.name} />
      <p>
        {menu.name}
        {menu.diet === 'Veg' ? <img className='dietLogo' src={veg} alt="Veg" /> : <img className='dietLogo' src={nonveg} alt="non-veg" />}
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
