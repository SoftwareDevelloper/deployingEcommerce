import { Link, useNavigate } from 'react-router-dom'
import hero_image from '../../asssets/banner.png'
import BSP from '../../Component/BestSellsProduct/BSP'
import Categories from '../../Component/Categories/categories'
import Category from '../../Component/category/category'
import FlashSalesProd from '../../Component/FlashSalesProduct/flashSalesProd'
import Products from '../../Component/Products/Products'
import '../CSS/home.css'

const Home = () => {
      const navigate = useNavigate();

  return (
    <>
    <div className='home '>
         <div className="sidebar">
         <Categories/>
         </div>
      <div className="hero" style={{backgroundColor:"#000"}}>
        
        <div className="heroleft" style={{color:"white"}}>
            <h1 className='titlebanner1'>Up to 40% OFF</h1> 
            <h1 className='titlebanner2'>From Fashion to Technology</h1>
            <Link to={'/Collections'}>
              <button className='shop_btn'>Explore Now
              </button>
            </Link>

        </div>
        <div className="heroright" style={{color:"white"}} >
            <img src={hero_image} alt=""/>
        </div>
      </div>
    </div>
     <div className="flashSales">
     <FlashSalesProd/>
     </div>
     <div className="Category">
      <Category/>
     </div>
     <div className="BSP">
      <BSP/>
     </div>
    
     <div className="AllProducts">
      <Products/>
     </div>
     </>
  )
}

export default Home
