import React, { Fragment , useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Search.css'

const Search = () => {
    const navigate = useNavigate()
    const [keyword , setKeyword] = useState("")
    const onSubmitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
          return navigate(`/${keyword}`)   
        }
        else{
          return  navigate('/')
        }
    }
  return (
   <Fragment>
       <form className="searchBox" onSubmit={onSubmitHandler}>
                <input type="text" placeholder='Search a Menu...' onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value='Search' />
            </form>
   </Fragment>
  )
}

export default Search
