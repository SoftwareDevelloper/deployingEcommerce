import React from 'react'
import './Item.css'
const Item = (props) => {
  return (
    <div className='item' key={props.id}>
      <div className='card_img'>
      <img src={props.image} alt="" />
      <div className="item_hover">
        <button className="add">Add To Cart</button>
        </div>
        <div className="icons_hover">
          <i className="bi_heart">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>
          </i>
          <i className="bi_eye">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
          </i>
          </div>
        <div className="discount_hover">
          <span>{props.discount} %</span>
      </div>
      </div>
      <p className='title'>{props.title}</p>
      <div className="item_prices">
        <p className='new_price'>${props.newprice}</p>
        <p className='old_price'>${props.oldprice}</p>
      </div>
      <div className="rating">
        <span> {props.rating}⭐ </span>
      </div>
    </div>
  )
}

export default Item
