import React from 'react'
import category from "../../asssets/Category/category"
import rect_icon from "../../asssets/rect_icon.png"
import ItemCateg from "../ItemCateg/ItemCateg"
import { Link } from 'react-router-dom';
import "./category.css"
const Category = () => {
  return (
    <div className='category container'>
        <div className="title1">
            <img src={rect_icon} alt="" width={"18px"} height={"45px"} />
            <span>Categories</span>
        </div>
        <div className="title2">
        <span>Browse By Category</span>
      </div>
      <div className="Category_item">
        {category.map((item, i) => (
          <div key={i}>
            <Link to={`/${item.name}`}  className='linkscatg'>
              <ItemCateg 
                id={item.id} 
                image={item.image} 
                name={item.name} 
              />            
            </Link>

          </div>
        ))}
      </div>
      
    </div>

  
  )
}

export default Category
