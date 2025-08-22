import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import rect_icon from '../../asssets/rect_icon.png'
import './Products.css'

const Products = () => {
    const [allproducts,setAllproducts] = useState([])
    const [cartItems, setCartItems] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
      const fetchNewCollection = async () => {
          try {
              const res =await fetch(`${API_URL}/NewCollections`);
              const data = await res.json();
              setAllproducts(data);
          } catch (error) {
              console.error('Error fetching products : ' , error)
              
          }
      };
      useEffect(() =>{
        fetchNewCollection();
      } , [])
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
                .then((response) => response.json(), toast.success("added to card successfully"))
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding to cart:', error));
            
        } else {
            console.error('User is not authenticated');
        }
    };
  return (
    <div className='Products container'>
        <ToastContainer/>
         <div className="title1">

                    <img src={rect_icon} alt="" width={"18px"} height={"45px"} />
                    <span style={{fontSize:"25px"}}>Our Products</span>
                </div>
                <br />
                <div className="title2">
                    <span>Explore Our Products</span>
                </div>
                <br />
                <div className="Products_item row g-4">
                {
                  allproducts.map((product,index) =>(
                      <div key={index} className='product-card col-12 col-md-4 col-lg-3 '>
                          <Link to={`/Product/${product.id}`}>
                          <img src={product.image} alt="" className='prod_img' />
                          </Link>
                            <div className="favorite" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <p className='prod_name'>{product.name}</p>
                                <i className="bi bi_heart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg>
                                </i>
                            </div>
                          <div className="price">
                          <p className='product_new_price'> $ {product.newPrice} </p> 
                          <p className='product_old_price'> $ {product.oldprice} </p>
                          
                          </div>
     
                      </div>
                  ))
              }
                </div>
                <Link to={'/Collections'}>
                <button className='viewAllBtn'>View All</button>
                </Link>
    </div>
  )
}

export default Products
