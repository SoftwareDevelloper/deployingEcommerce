import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../CSS/Orders.css'
import { toast, ToastContainer } from "react-toastify";
const Orders = () => {
    const { id } = useParams();
    const [orders,setOrders] = useState([]);
    //fetch order by user id from db
    useEffect(()=>{
        const fetchOrders = async()=>{
            try {
                const res = await fetch(`http://localhost:4000/Order/${id}`);
                const data = await res.json();
                console.log("api response",data);
                if (data.success && Array.isArray(data.orders)) {
                    const flattened = data.orders.flat();
                    setOrders(flattened);
                }
            } catch (error) {
                console.error("Error fetching orders:",error);
            }
        };
        fetchOrders();
    },[id])
    // cancel order by user id from db
    const CancelOrder = async (id) => {
    const token = localStorage.getItem('auth-token');
    if (!token) return;
    try {
        const response = await fetch(`http://localhost:4000/cancel/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });
        const data = await response.json();
        if (response.ok) {
        toast.success("Order cancelled successfully.");
        } else {
        toast.error(data.message || "Failed to cancel order.");
        }
    } catch (error) {
        console.error("Error cancelling order:", error);
        toast.error("An error occurred while cancelling the order.");
    }
    };
  return (
    <div className="orders-container">
        <ToastContainer/>
      {orders.length === 0 ? (
        <div className="NOOrders">No orders found for this user.</div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-items">
              {order.items?.map((item) => (
                <div className="order-item" key={item._id}>
                  <img src={item.image} alt={item.name} className="item-img" />
                  <div className="info_order_product">
                    <p className="itemName">{item.name}</p>
                    <p className="ItemAmount"> ${order.totalAmount?.toFixed(2)}</p>
                  </div>
                  <div className="payment">
                    <p className="paymentOptions">Paid with <span>{order.paymentMethod}</span></p>
                    <p className="PaymentStatus"> Payment Status : <span>{order.paymentStatus}</span> </p>
                  </div>
                  <div className="cancel">
                    <button className="statusOrder"> {order.status} </button>
                    <button className="cancel_btn" onClick={() =>CancelOrder(order._id)}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
