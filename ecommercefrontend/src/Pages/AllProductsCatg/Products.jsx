import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../CSS/productCat.css';
import Kids from '../../asssets/kidsBanner.png';
import Men from  '../../asssets/MenBanner.png';
import Phones from '../../asssets/phones.png';
import Ps5 from '../../asssets/ps5.png';
import Tv from '../../asssets/Tv.png';
import Women from '../../asssets/womenBanner.png';

const Products = () => {
  const API_URL = process.env.REACT_APP_API_URL;
    const {category} = useParams();
    const categoryBanner = {
      "Women's":Women,
      "Men's":Men,
      "Kids":Kids,
      "Phones":Phones,
      "Tv":Tv,
      "Games":Ps5,
    };
    const bannerStyle = {
      image: `url(${categoryBanner[category]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    const bannerText = {
      "Phones": { title: "Latest Smartphones", subtitle: "Explore our top devices" },
      "Games": { title: "Gaming World", subtitle: "Play. Compete. Win." },
      "Tv": { title: "Latest TVs", subtitle: "Find your next screen" },
      "Women's": { title: "Women's Collection", subtitle: "Style meets elegance" },
      "Men's": { title: "Men's Collection", subtitle: "Bold and Modern" },
      "Kids": { title: "For the Little Ones", subtitle: "Fun, colorful, and comfy" },
    };


    const [products,setProducts] = useState([]);
     const [cartItems, setCartItems] = useState([]);
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
                    toast.success("Product added to card successfully")
                
            } else {
                 toast.error("Please login first")
            }
        };
    useEffect(()=>{
        fetch(`${API_URL}/Category/${category}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('failed to fetched product by  category:',error))
    }, [category]);

  return (
    <>
    <ToastContainer/>
    <div className="banner-catg" style={bannerStyle}>
      <div className="banner-content">
        <h1 className="category-title">{bannerText[category]?.title || category}</h1>
        <p className="category-subtitle">{bannerText[category]?.subtitle || "Be the first to explore it now!"}</p>
        <button className="explore-btn">Explore Now</button>
      </div>
      <img src={categoryBanner[category]} alt={`${category} banner`} style={{ width:"500px",height:"400px"}}/>
    </div>


    <div className='products-category'>
        
      {
        products.map((products)=>(
            <div className="product_card" key={products.id}>
                <Link to={`/Product/${products.id}`}>
                  <img src={products.image} alt={products.name} />
                </Link>
                <p className='prod_name'> {products.name} </p>
                <div className="prices">
                    <p className='new_price'> ${products.newPrice} </p>
                    <p className="old_price"> ${products.oldprice} </p>
                </div>
                <button className='addToCart' onClick={() => addTocart(products.id)}>Add to cart 
                    <i className="bi-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    </i>
                </button>
                
            </div>
        ))
      }
      
    </div>
    </>
  );
};

export default Products;
