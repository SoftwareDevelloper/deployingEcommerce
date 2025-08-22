import { useEffect, useState } from 'react';
import Bank from '../../asssets/Bank.png';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements} from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import '../CSS/Checkout.css';
import { elements } from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';

const stripePromise = loadStripe('pk_test_51RoCVCGar6ByhFT1cb72cOGB5F1gaafxKqK6MNgqOBu7i22L3VwtIsJxiYV1ULzML2bWvR9JawFkB26lU5rZ4rXF00OwPah8cG');

const Checkout = () => {
const [items, setItems] = useState([]);
const API_URL = process.env.REACT_APP_API_URL;
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
const [billingDetails, setBillingDetails] = useState({
  firstName: '',
  companyName: '',
  streetAddress: '',
  apartment: '',
  city:'',
  phone:'',
  email:'',
  saveInfo:false,
});
const stripe = useStripe();
const elements = useElements();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('auth-token');
      try {
        const res = await fetch(`${API_URL}/getCart`, {
          headers: { Authorization: `Bearer ${token}`, },
        });
        const data = await res.json();
        if (data.success) {
          const mappedItems = data.cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.newPrice || item.oldprice,
            quantity: item.quantity,
            image: item.image,
          }));
          setItems(mappedItems);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);
  const placeOrder = async()=>{
    const token = localStorage.getItem('auth-token');
    let paymentIntentId = null;
    if (selectedPaymentMethod === 'bank') 
    {
      try {
      const paymentIntentRes = await fetch(`${API_URL}/createPaymentIntent`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({totalAmount}),
      });
      const paymentIntentData = await paymentIntentRes.json();
      const result = await stripe.confirmCardPayment(paymentIntentData.clientSecret,{
        payment_method:{
          card: elements.getElement(CardElement),
          billing_details:{
              name:billingDetails.firstName,
              phone:billingDetails.phone,
              email:billingDetails.email,
              address: {
                line1: billingDetails.streetAddress,
                line2: billingDetails.apartment || '',
                city: billingDetails.city,
              },

          },
        },
      });
      if (result.error) 
      {
        console.error("Payment failed:" +result.error.message); 
        return; 
      }
      if (result.paymentIntent.status !== "succeeded")
      {
        toast.error("Payment not completed");
        return;
      }
      paymentIntentId = result.paymentIntent.id;
      }catch(error){
       console.error("Stripe payment error:",error);
       return;
      }
    }
    // Create the order
    const orderRes = await fetch(`${API_URL}/createOrder`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`,
      },
      body:JSON.stringify({
        items,
        totalAmount,
        billingDetails,
        paymentMethod:selectedPaymentMethod==="bank" ? "stripe":"cash",
        paymentIntentId,
      }),
    });
    const orderData = await orderRes.json();
    if (orderData.success)
    {
      toast.success("Order placed successfully");  
    }
  };
const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className='checkout'>
      <ToastContainer/>
      <div className="clientInfo">
        <h1 className='title_billing'> Billing Details </h1>
        <form action="#" className='formCheckout' onSubmit={(e) => e.preventDefault()}>
          <div className="FistName">
            <label htmlFor="first name" className='label'> First Name<span>*</span> </label>
            <input type="text" className='input' name='firstName' value={billingDetails.firstName} onChange={(e)=>setBillingDetails({...billingDetails,[e.target.name]:e.target.value})}/>
          </div>
          <div className="companyName">
            <label htmlFor="company name" className='label'> Company Name  (optional) </label>
            <input type="text" className='input' name='companyName' value={billingDetails.companyName} onChange={(e)=>setBillingDetails({...billingDetails,[e.target.name]:e.target.value})}/>
          </div>
          <div className="adress">
            <label htmlFor="street adress" className='label'> Street Adress </label>
            <input type="text" className='input' name='streetAddress' value={billingDetails.streetAddress} onChange={(e)=>setBillingDetails({...billingDetails,[e.target.name]:e.target.value})}/>
          </div>
          <div className="Appartment">
            <label htmlFor="apprtment" className='label'> Apartment, floor, etc. (optional) </label>
            <input type="text" className='input'  name='apartment' value={billingDetails.apartment} onChange={(e)=>setBillingDetails({...billingDetails,[e.target.name]:e.target.value})}/>
          </div>
          <div className="city">
            <label htmlFor="city" className='label'> Town/City<span>*</span> </label>
            <input type="text" className='input'  name='city'   value={billingDetails.city} onChange={(e)=>setBillingDetails({...billingDetails,[e.target.name]:e.target.value})}/>
          </div>
          <div className="tel">
            <label htmlFor="tel" className='label'> Phone Number<span>*</span>  </label>
            <input type="text" className='input' name='phone' value={billingDetails.phone} onChange={(e)=>setBillingDetails({...billingDetails,[e.target.name]:e.target.value})}/>
          </div>
          <div className="email">
            <label htmlFor="mail" className='label'> Email Adress<span>*</span> </label>
            <input type="text" className='input' name='email' value={billingDetails.email} onChange={(e)=>setBillingDetails({...billingDetails,[e.target.name]:e.target.value})}/>
          </div>

          <div className="checkbox">
            <input type="checkbox" name="saveInfo" id="check" value={billingDetails.saveInfo} checked={billingDetails.saveInfo} onChange={(e) => setBillingDetails({ ...billingDetails, saveInfo: e.target.checked })}/>
            <span> Save this information for faster check-out next time </span>
          </div>
          <button className="place_order_btn" disabled={!selectedPaymentMethod} onClick={placeOrder} >Place Order</button>
        </form>
      </div>
      <div className="cartProducts">
        {items.map(item => (
        <div className="product_checkout" key={item.productId}>
          <img src={item.image} alt="" className='product_img' />
          <span className='product_title'> {item.name} </span>
          <span className="product_price">$ {(item.price * item.quantity).toFixed(2)}</span>    
        </div>
         ))}
        <div className="cartTotalPrice">
          <div className="price_row">
          <span className='label'>SubTotal:</span>
          <span className='price'>${totalAmount.toFixed(2)}</span>
          </div>
          <hr className='price_hr'/>
          <div className="price_row">
            <span className='label'>Shipping:</span>
            <span className='price'>Free</span>
          </div>
          <hr className='price_hr'/>
          <div className="price_row">
            <span className='label'>Total:</span>
            <span className='price'>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <div className="checkbox_methode_payment">
          <div className="bank">
            <input type="radio" name="payment" id="radio" value="bank"checked={selectedPaymentMethod === 'bank'} onChange={(e) => setSelectedPaymentMethod(e.target.value)} />
            <span className='bank' >Bank</span>
            <img src={Bank} alt="" /> 
          </div>
          {selectedPaymentMethod === 'bank' && (
            <form className='formCheckout' onSubmit={(e) => e.preventDefault()}>
              <CardElement />
            </form>
          )}

         
          <div className="cash">
            <input type="radio" name="cash" id="radio" value="cash" checked={selectedPaymentMethod === 'cash'} onChange={(e) => setSelectedPaymentMethod(e.target.value)} />
            <span className='cash'>Cash on delivery</span>
          </div>
        </div>

        <div className="coupons">
          <input type='text'className='input_coupon' placeholder='Coupon Code' />
          <button className='btn_couppon'>Apply Coupon</button>
        </div>
      </div>
      
    </div>
  )
}

export default Checkout
