import React, { useEffect, useState } from 'react';
import '../CSS/wishlist.css';
import { CircleX } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const Wishlist = () => {
    const[WishlistItems,setWishlistItems] = useState([]);
const [cartItems, setCartItems] = useState([]);
    const addTocart = (itemId) => {
      const user = JSON.parse(localStorage.getItem('user'));
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 })); 
      const token = localStorage.getItem('auth-token');
      if (token) {
          fetch('http://localhost:4000/Addtocart', {
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
          
      } else {
          console.error('User is not authenticated');
      }
  };
    useEffect(()=>{
      const fetchWishlist = async () =>{
        const token = localStorage.getItem('auth-token');
        try {
          const response = await fetch('http://localhost:4000/getFromWishlist',{
            method:'Get',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if(data.success)
          {
            setWishlistItems(Array.isArray(data.Wishlist) ? data.Wishlist : []);
          }
        } catch (error) {
          console.error('Error fetching Wishlist:',error);
        }
      };
      fetchWishlist();
    },[]);
    const removeFromWishlist = async(itemId) =>{
      const  user = JSON.parse(localStorage.getItem('user'));
      setWishlistItems((prev)=>prev.filter(item => item.id !== itemId));
       const token = localStorage.getItem('auth-token');
      if (token) {
        fetch('http://localhost:4000/RemoveFromWishlist',{
          method:'POST',
          headers:{
            Accept:'application/json',
           'Authorization': `Bearer ${token}`,
            'Content-Type':'application/json',
          },
          body:JSON.stringify({itemId: itemId,  user:user}),
          
        })
        .then((response)=>response.json(), toast.success("You removed product from wishlist"))
        .then((data)=>console.log(data))
        .catch((error)=>console.error('Error removing from wishlist',error))
      }else{
        alert("please authenticate first , so you can add your items to your cart ")
      }
      
    };
  return (
    <>
    <ToastContainer/>
    <h1 className='wishlist_title'>Your Wishlist</h1>
    <div className='wishlist'>

      
     {WishlistItems.length === 0 ?(
     
       <p style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10%"}}>Your wishlist is empty 
      <i class="bi bi-emoji-frown-fill" style={{marginLeft:"10px"}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-2.715 5.933a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"/>
      </svg>
      </i>
       </p>
     
     ):(
      WishlistItems.map((item)=>(
        <div className="wihlist_cart" key={item.id}>
          <div className="removeFromwishlist" onClick={()=>removeFromWishlist(item.id)}>
            <CircleX className='removeIcon' />
          </div>
            <img src={item.image} alt={item.name}  className='prod_img_wishlist'/>
      </div>
      ))
     )
    
    }
    </div>
    </>
  )
}

export default Wishlist
