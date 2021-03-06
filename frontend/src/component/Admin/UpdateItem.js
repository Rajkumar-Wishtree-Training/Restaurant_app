import React, { Fragment, useEffect, useState } from "react";
import "./newItem.css";
import { useSelector, useDispatch } from "react-redux";
import { clearMenuErrors, updateMenuItem, getMenuItemDetails } from "../../redux/actions/MenuAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_MENU_RESET } from "../../redux/reducers/MenuSlice";
import MetaData from "../MetaData";

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

const UpdateItem = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch();
    const alert = useAlert();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [diet, setDiet] = useState('')
    const [image, setImage] = useState();
    // const [oldImage, setOldImage] = useState({})
    // const [imagePreview, setImagePreview] = useState();

    const { loading, error, success, isUpdated, menuItem } = useSelector((state) => state.menuList);

    const menuItemId = location.pathname.split('/')[3]

    const updateMenuSubmitHandler = (e) => {
        e.preventDefault();

        let myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("category", category);
        myForm.set("description", description)
        myForm.set("diet", diet)
        myForm.set("image", image);
        // console.log(image);
        dispatch(updateMenuItem(menuItemId, { name, price, category, diet, description, image }));
    };
    const updateMenuImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                // setImagePreview(reader.result);
                // console.log(e.target.files , "in image change");
                setImage(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (menuItem && menuItem._id !== menuItemId) {
            dispatch(getMenuItemDetails(menuItemId))
        }
        else {
            setName(menuItem.name);
            setDescription(menuItem.description);
            setPrice(menuItem.price);
            setCategory(menuItem.category);
            setDiet(menuItem.diet)
            setImage(menuItem.image);
            // console.log(image);
        }
        if (error) {
            alert.error(error);
            dispatch(clearMenuErrors());
        }

        if (isUpdated) {
            alert.success("Product Update Successfully");
            navigate("/admin/menuitems");
            dispatch(UPDATE_MENU_RESET());
        }
    }, [dispatch, alert, error, navigate, success, isUpdated, menuItem, menuItemId]);

    return (
        <Fragment>
            <MetaData title='Dilse Foodie --Update Product'/>
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateMenuSubmitHandler}
                    >
                        <h1>Update Menu</h1>

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
                                value={price}
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
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option >Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                                <option value="">Choose Diet</option>
                                {diets.map((diet) => (
                                    <option key={diet} value={diet}>
                                        {diet}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div id="createProductFormFile">
                            <img src={image?.url ? image.url : image} alt='' />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateMenuImageChange}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateItem
