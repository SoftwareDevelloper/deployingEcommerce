import { useEffect, useState } from 'react'
import cross_icon from '../../assets/cross_icon.png'
import './listProd.css'
const ListProd = () => {
    const [allproducts,setAllproducts] = useState([])
    const fethInfo = async () => {
        try {
            const res =await fetch('http://localhost:4000/allProducts');
            const data = await res.json();
            setAllproducts(data);
        } catch (error) {
            console.error('Error fetching products : ' , error)
            
        }
    };
    useEffect(() =>{
        fethInfo();
    } , [])
    const removeProduct  = async(id) =>{
        await fetch('http://localhost:4000/removeProduct',{
            method:"POST",
            headers:{
                Accept:'application/json',
                'content-type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fethInfo();
    }
  return (
    <div className='list_product'>
      <h1> ALL PRODUCTS LIST</h1>
      <div className="listProduct-main">
        <p>Products</p>
        <p>Titles</p>
        <p>old price</p>
        <p>Solde</p>
        <p>new price</p>
        <p>category</p>
        <p>remove</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {
            allproducts.map((product,index) =>(
                <div key={index} className='product-row'>
                    <img src={product.image} alt="" className='list_product_img' />
                    <p>{product.name}</p>
                    <p> {product.oldprice} </p>
                    <p> {product.solde}%</p>
                    <p> {product.newPrice} </p>
                    <p> {product.category} </p>
                    <div className="remove_icon">
                        <img src={cross_icon} alt="" onClick={() => removeProduct(product.id)} />
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default ListProd
