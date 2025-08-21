import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Component/Footer/Footer';
import Navbar from './Component/Navbar/Navbar';
import About from './Pages/About/About';
import Products from './Pages/AllProductsCatg/Products';
import Cart from './Pages/Cart/cart';
import Collections from './Pages/Collections/Collections';
import Contact from './Pages/Contact/contact';
import Home from './Pages/Home/home';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/SignIn/Login';
import SignUp from './Pages/SignUp/SignUp';
import Wishlist from './Pages/Wishlist/Wishlist';
import CheckoutWrapper from './Pages/Checkout/CheckoutWrapper';
import Orders from './Pages/Profile/Orders';
import CancelOrder from './Pages/Profile/CancelOrder';
import ProductsDetails from './Pages/ProductsDetails/ProductsDetails';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="header">
          <Navbar />
        </div>

        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="About" element={<About />} />
            <Route path="Register" element={<SignUp />} />
            <Route path="Login" element={<Login />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="Collections" element={<Collections />} />
            <Route path="/:category" element={<Products />} />
            <Route path="/Profile/:id" element={<Profile />} />
            <Route path="/MyOrders/:id" element={<Orders />} />
            <Route path="/MyCancellations/:id" element={ <CancelOrder/> } />
            <Route path="/CheckOut" element={<CheckoutWrapper />} />
            <Route path='/Product/:id' element={<ProductsDetails/>}/>
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
