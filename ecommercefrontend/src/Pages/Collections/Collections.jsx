import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './Collections.css';
import { Link } from 'react-router-dom';

const Collections = () => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems,setWishlistItems] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    const addTocart = (itemId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 })); 
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch(`${API_URL}/Addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId , user:user})
 
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding to cart:', error));
                toast.success("Product added to cart successfully")
            
        } else {
            console.error('User is not authenticated');
            toast.error("Please login first")
        }
    };
    const addToWishlist = (itemId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        setWishlistItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 })); 
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch(`${API_URL}/Addtowishlist`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId , user:user})
 
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding to wishlist:', error));
                toast.success("Product added to the wishlist successfully")
            
        } else {
            console.error('User is not authenticated');
        }
    };
    const [allproducts,setAllproducts] = useState([])
    const fethInfo = async () => {
        try {
            const res =await fetch(`${API_URL}/allProducts`);
            const data = await res.json();
            setAllproducts(data);
        } catch (error) {
            console.error('Error fetching products : ' , error)
            
        }
    };
    useEffect(() =>{
        fethInfo();
    } , [])
    
  return (
    <div className='NewCollections container'>
        <ToastContainer/>
        <h1 className='collections_title'>New Collections</h1>
        <div className="collection">
        {
                  allproducts.map((product,index) =>(
                      <div key={index} className='product-card'>
                        <Link to={`/Product/${product.id}`}>
                            <img src={product.image} alt="" className='prod_img' />
                        </Link>
                          <p className='prod_name'>{product.name}</p>
                          <div className="price">
                            <p className='product_new_price'> $ {product.newPrice} </p> 
                            <p className='product_old_price'> $ {product.oldprice} </p>
                          </div>  
                      </div>
                  ))
              }
        </div>
      
     
    </div>
  )
}

export default Collections
