import { CircleX, Heart, LogOut, ShoppingBag, ShoppingCart, Star, User, User2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../asssets/logo.png'
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleDropdown = () => setOpen(!open);

  // Get token from localStorage
  const token = localStorage.getItem("auth-token");
  let userId = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      userId = decoded.user?.id || decoded.user?._id;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  return (
    <nav className='navbar'>
        <Link to={"/"}>
          <img src={logo} className='logo' alt=""  style={{width:"150px",borderRadius:"50px",height:"70px"}} onClick={() => setIsMenuOpen(false)}/>
        </Link>
      <nav className={`nav-links-container ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-links">
           <ul>
            <li>
              <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
              <span className='nav_link' >Home</span></Link>
            </li>
            <li>
              <Link to={"/Contact"} onClick={() => setIsMenuOpen(false)}>
              <span className='nav_link'  >Contact</span></Link>
            </li>
            <li>
              <Link to={"/About"} onClick={() => setIsMenuOpen(false)}>
              <span className='nav_link'  >About</span>
              </Link>
            </li>
           </ul>
        </div>
      </nav>
      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleMenu} aria-label="Toggle menu" role="button" tabIndex={0}
        onKeyPress={e => { if (e.key === 'Enter') toggleMenu(); }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="iconsEcomm">
        <div className="favorite">
          <Link to={"/wishlist"}>
            <Heart style={{width:"25px",height:"25px"}} className='heart'/>
          </Link> 
        </div>
        <div className="cart">
          <Link to={"/cart"}>
          <ShoppingCart  style={{width:"25px",height:"25px"}} className='cart'/>
          </Link>
        </div>
          <div className="login_logout">
            {localStorage.getItem('auth-token')?
            <>
            <div className="profile_client" onClick={toggleDropdown} onMouseEnter={() => setOpen(true)}>
              <button type="button" className='nav_link_btn_profile'> <User style={{width:"25px",height:"25px"}}/> </button>
            </div>
             {open && (
                <div className="dropdown_profile_client">
                    <span className='li'>
                      <Link to={`/Profile/${userId}`} style={{color:"white"}} onClick={toggleDropdown}>
                        <User2 style={{width:"25px",height:"25px",color:"white"}}/> Manage My Account
                      </Link>
                    </span >
                    <span  className='li'>
                      <Link to={`/MyOrders/${userId}`} style={{color:"white"}} onClick={toggleDropdown}>
                      <ShoppingBag style={{width:"25px",height:"25px"}}/> My Order
                      </Link>
                    </span >
                    <span  className='li'>
                      <Link to={`/MyCancellations/${userId}`}  style={{color:"white"}} onClick={toggleDropdown}>
                       <CircleX style={{width:"25px",height:"25px"}}/> My Cancellations
                      </Link>
                    </span >
                    <span  className='li'>
                      <Link to={`/MyReviews/${userId}`} style={{color:"white"}} onClick={toggleDropdown}>
                       <Star style={{width:"25px",height:"25px"}}/> My Reviews
                      </Link>
                    </span >
                    <span  onClick={toggleDropdown} className='li'>
                      <LogOut style={{width:"25px",height:"25px"}}/> <button className='logout_btn' onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                    </span >
                </div>
             )}
            </>
            :<Link to={"/Register"}>
            <button className='nav_link_btn' style={{marginLeft:"15px"}} >Sign Up</button>
            </Link>
            }
          </div>
     </div>

    </nav>
  )
}
export default Navbar
