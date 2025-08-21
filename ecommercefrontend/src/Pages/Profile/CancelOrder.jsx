import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../CSS/Orders.css'

  const CancelOrder = () => {
    const { id } = useParams();
    const [Orders, setOrders] = useState([]);
    useEffect(() => {
      const fetchCancelledOrders = async () => {
        try {
          const res = await fetch(`http://localhost:4000/cancelled-orders/${id}`);
          const data = await res.json();
          console.log("API response:", data);

          if (data.success && Array.isArray(data.cancelledOrders)) {
            setOrders(data.cancelledOrders);
          } else {
            setOrders([]);
          }
        } catch (err) {
          console.error("Error fetching orders:", err);
          setOrders([]);
        }
      };
      fetchCancelledOrders();
    }, [id]);
    return (
    <div className="orders-container">
        {Orders.length === 0 ? (
          <div className="NOOrders">No orders is cancelled by this user.</div>
        ) : (
          Orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-items">
                {order.items?.map((item) => (
                  <div className="order-item" key={item._id}>
                    <img src={item.image} alt={item.name} className="item-img" />
                    <div className="info_order_product">
                      <p className="itemName">{item.name}</p>
                      <p className="ItemAmount"> ${order.totalAmount?.toFixed(2)}</p>
                    </div>
                    <div className="cancel">
                      <button className="statusOrder"> {order.status} </button>
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


  export default CancelOrder
