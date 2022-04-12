import React, { Fragment, useEffect, useState } from "react";
import MenuCard from "../../component/MenuCard";
import Loader from "../../component/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import Search from "../../component/Search/Search.js";
import { clearMenuErrors, getMenuItems } from "../../redux/actions/MenuAction";
import { useAlert } from "react-alert";
import { useLocation} from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { clearErrors } from "../../redux/actions/authAction";

const categories = [
  "All",
  "punjabi",
  "local",
  "chinease",
  "gujrati",
  "snack"
]

function Home() {
  const location = useLocation();
  // const navigate = useNavigate()
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [category , setCategory] = useState("")
  const [price ,setPrice] = useState([0,3000])
  
  const { menus, menuCount, filteredProductCount, resultPerPage, loading } = useSelector(
    (state) => state.menuList
  );
  const { error , isAuthenticated} = useSelector(state => state.userDetails)
  const keyword = location.pathname.split("/")[1];
  // console.log(keyword);
  
  useEffect(() => {
      dispatch(getMenuItems(keyword, currentPage , price , category));
    if(error){
      alert.error(error)
    }
    dispatch(clearMenuErrors())
    dispatch(clearErrors())
    }
  , [dispatch, alert, error, keyword, currentPage , price , category , isAuthenticated]);
  
  //set current page no
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  
  //Handling price
  const priceHandler = (event , newPrice) => {
    setCurrentPage(1)
    setPrice(newPrice)
  }
  const handleCategoryClick = (value) =>{
    setCategory(value) 
    setCurrentPage(1)
  }
  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <Search />
      <div className="home">
        {menus && menus.map((menu) => <MenuCard key={menu._id} menu={menu} />)}
      </div>
      <div className="paginationBox">
        {resultPerPage < filteredProductCount && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={Number(resultPerPage)}
            totalItemsCount={menuCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </div>
      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={3000}
        />
         <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
      </div>
     
    </Fragment>
  );
}

export default Home;
