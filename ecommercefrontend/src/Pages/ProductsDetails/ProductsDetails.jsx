import React, { use, useEffect, useState } from 'react';
import './ProductsDetails.css';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ProductsDetails = () => {
  const [ProductDetails, SetProductDetails] = useState(null);
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems,setWishlistItems] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/Product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('product fetched', data);
        SetProductDetails(data[0]);
        setActiveImage(data[0].image);
      })
      .catch((error) => {
        console.error('error fetching product', error);
      });
  }, [id]);

  if (!ProductDetails) return <div className='spinner'>Loading...</div>;

  const AddToCart = (itemId)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    setCartItems((prev)=>({...prev,[itemId]:(prev[itemId] || 0)+1}))
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch('http://localhost:4000/Addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': "application/json",
        },
        body: JSON.stringify({ itemId: itemId, user: user })
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("error adding cart", error));
      toast.success("Product added to Cart successfully");

    }
  }
    const AddToWishlist = (itemId)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    setCartItems((prev)=>({...prev,[itemId]:(prev[itemId] || 0)+1}))
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch('http://localhost:4000/Addtowishlist', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': "application/json",
        },
        body: JSON.stringify({ itemId: itemId, user: user })
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("error adding to wishlist", error));
      toast.success("Product added to Wishlist  successfully");

    }
  }

  return (
    <div className='ProductsDetails'>
      <ToastContainer/>
      <div className="imgs">
        {[ProductDetails.image1, ProductDetails.image2, ProductDetails.image3, ProductDetails.image4, ProductDetails.image5]
          .filter(Boolean)
          .map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Product view ${idx + 1}`}
              onMouseEnter={() => setActiveImage(img)} // or onClick for click only
            />
          ))}
      </div>

          <div className="thumbnail">
            <img src={activeImage} alt="Product" style={{ height: "auto" }} />
          </div>


      <div className="rightDiv">
        <h2 className="title">{ProductDetails.name}</h2>

        <span className="availability">
          {ProductDetails.available ? <p className="in">In Stock</p> :  <p className="out">Out of Stock</p> }
        </span>
        <div className="prices">
          {
            ProductDetails.newPrice > 0 &&(
              <span className="newPrice">${ProductDetails.newPrice}</span>
            )
          }
          {ProductDetails.solde > 0 && (
            <span className="solde">-{ProductDetails.solde}%</span>
          )}
          {ProductDetails.newPrice === 0 ? (
            <span className="oldPrices">${ProductDetails.oldprice}</span>
          ) : (
            <>
              <span className="oldPrice"><del>${ProductDetails.oldprice}</del></span>
            </>
          )}

        </div>
        <p className="description">{ProductDetails.description}</p>
        <div className="colors">
          <span>Colors:</span>
          {ProductDetails.color?.map((col, idx) => (
            <span
              key={idx}
              className="colorCircle"
              title={col.name}
              style={{
                backgroundColor: col.hex,
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                margin: '0 5px',
                border: '1px solid #ccc',
              }}
            ></span>
          ))}
        </div>

        <div className="size">
          <span>Sizes:</span>
          {ProductDetails.Size?.map((s, idx) => (
            <span key={idx} className="sizeItem" style={{ margin: '0 5px' }}>
              {s}
            </span>
          ))}
        </div>

        <div className="actions">
          <button className="buyNow" onClick={()=>AddToCart(id)}>Buy Now</button>
          <button className="wishlists" onClick={()=>AddToWishlist(id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
