import React from 'react'
import { Link } from 'react-router-dom'
import flashSalesProd from "../../asssets/Products/bestSellerProducs"
import rect_icon from '../../asssets/rect_icon.png'
import Item from '../Item/Item'
import './flashSalesProd.css'
const FlashSalesProd = () => {
  return (
    <div className='flashSalesProds container'>
        <div className=" mb-4 title1">
            <img src={rect_icon} alt="" width={"18px"} height={"45px"} />
            <span className='ms-2 fs-4'>Today's</span>
        </div>
        <div className='row align-items-center mb-4 titleTime'>
            <div className='col-md-6'>
            <p className="title2 h3 mb-0">Flash Sales</p>
            </div>
            
            <div className="col-md-5 d-flex justify-content-end gap-3 flex-wrap times">
                <div className="text-center timeUnit">
                    <span className="label">Days</span>
                    <span className="value ">03   </span>
                    
                </div>
                <div className="timeUnit">
                    <span className='label'>Hours</span>
                    <span className='value'>23  </span>
                </div>
                <div className="timeUnit">
                    <span className='label'>Minutes</span>
                    <span className="value">19 </span>
                </div>
        </div>
            </div>
            
            <div className='row'>
        {flashSalesProd.map((item, i) => (
          <div key={i} className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>
            <Item 
              id={item.id}
              title={item.title}
              image={item.image}
              discount={item.discount}
              oldprice={item.oldprice}
              newprice={item.newprice}
              rating={item.rating}
            />
          </div>
        ))}
      </div>
        <div className="viewAll">
            <Link to={'/Collections'}>
            <button className="viewAllProd">View All Product</button>
            </Link>
        </div>
      
    </div>
  )
}

export default FlashSalesProd
