import React from 'react'
import MenuCard from '../../component/MenuCard'
import './Home.css'

const menus = [{
    _id : 1,
    name : "Panner Butter Masala",
    description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, doloribus?',
    price : 120,
    diet : 'veg',
    category : 'punjabi',
    user : '123',
    images : 'https://i.ytimg.com/vi/5ENlv4zX_Nc/hqdefault.jpg'
},
{ _id : 2,
    name : "Panner Butter Masala",
    description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, doloribus?',
    price : 120,
    diet : 'veg',
    category : 'punjabi',
    user : '123',
    images : 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/paneer-butter-masala.jpg'},
{ _id : 3,
    name : "Panner Butter Masala",
    description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, doloribus?',
    price : 120,
    diet : 'non-veg',
    category : 'punjabi',
    user : '123',
    images : 'https://www.whiskaffair.com/wp-content/uploads/2019/05/Paneer-Butter-Masala-2-3.jpg'},
{ _id : 4,
    name : "Panner Butter Masala",
    description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, doloribus?',
    price : 120,
    diet : 'veg',
    category : 'punjabi',
    user : '123',
    images : 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/paneer-butter-masala.jpg'},
{ _id : 5,
    name : "Panner Butter Masala",
    description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, doloribus?',
    price : 120,
    diet : 'non-veg',
    category : 'punjabi',
    user : '123',
    images : 'https://www.whiskaffair.com/wp-content/uploads/2019/05/Paneer-Butter-Masala-2-3.jpg'},
{ _id : 6,
    name : "Panner Butter Masala",
    description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, doloribus?',
    price : 120,
    diet : 'veg',
    category : 'punjabi',
    user : '123',
    images : 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/paneer-butter-masala.jpg'},
{ _id : 7,
    name : "Panner Butter Masala",
    description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, doloribus?',
    price : 120,
    diet : 'non-veg',
    category : 'punjabi',
    user : '123',
    images : 'https://www.whiskaffair.com/wp-content/uploads/2019/05/Paneer-Butter-Masala-2-3.jpg'}]

function Home() {
  return (
    <div className='home'>
      {
          menus.map(menu => <MenuCard key={menu._id} menu={menu}/>)
      }
    </div>
  )
}

export default Home
