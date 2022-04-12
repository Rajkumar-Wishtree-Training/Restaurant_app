import React, { Fragment, useEffect, useState } from "react";
import "./newItem.css";
import { useSelector, useDispatch } from "react-redux";
import { createMenuItem , clearMenuErrors } from "../../redux/actions/MenuAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { CREATE_MENU_RESET } from "../../redux/reducers/MenuSlice";

const categories = [
    "punjabi",
    "local",
    "chinease",
    "gujrati",
    "snack"
  ]
const diets = [
    "veg",
    "non-veg"
]

const CreateItem = () => {
    const navigate  =useNavigate()
    const dispatch = useDispatch();
    const alert = useAlert();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [diet , setDiet] = useState('')
    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();

  const { loading, error, success } = useSelector((state) => state.menuList);

  const createMenuSubmitHandler = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("category", category);
    myForm.set("description",description)
    myForm.set("diet" , diet)
    myForm.set("image", image);
    console.log(image);
    dispatch(createMenuItem({name , price , category , diet , description , image }));
  };
  const createMenuImageChange = (e) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearMenuErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch(CREATE_MENU_RESET());
    }
  }, [dispatch, alert, error, navigate, success]);

  return (
    <Fragment>
    <div className="dashboard">
      <SideBar />
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createMenuSubmitHandler}
        >
          <h1>Create Menu</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <DescriptionIcon />

            <textarea
              placeholder="Item Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div>
            <AccountTreeIcon />
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>
          <div>
            <AccountTreeIcon />
            <select onChange={(e) => setDiet(e.target.value)}>
              <option value="">Choose Diet</option>
              {diets.map((diet) => (
                <option key={diet} value={diet}>
                  {diet}
                </option>
              ))}
            </select>
          </div>
          <div id="createProductFormFile">
                  <img src={imagePreview} alt='' />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createMenuImageChange}
                  />
                </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  </Fragment>
  )
}

export default CreateItem
