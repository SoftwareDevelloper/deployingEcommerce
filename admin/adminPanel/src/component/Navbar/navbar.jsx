import addIcon from "../../assets/Product_cart.svg"
import ListIcon from '../../assets/Product_list_icon.svg'
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.png'

import './navbar.css'
const Navbar = () => {
  return (
 <aside className="Navbar">
      <img src={logo} className='logo' alt=""  style={{width:"100%",height:"18%"}}/>
      <NavLink
        to="/addProduct"
        className={({ isActive }) =>
          isActive ? "sidebar_items active" : "sidebar_items"
        }
      >
        <img src={addIcon} alt="Add Product" width="20" height="20" />
        <p>Add Product</p>
      </NavLink>

      <NavLink
        to="/AllProducts"
        className={({ isActive }) =>
          isActive ? "sidebar_items active" : "sidebar_items"
        }
      >
        <img src={ListIcon} alt="Products List" width="20" height="20" />
        <p>Products List</p>
      </NavLink>
    </aside>
  );
};


export default Navbar
