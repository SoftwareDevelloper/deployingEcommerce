import React from 'react'
import rightimg from '../../asssets/aside_img.png'
import '../CSS/About.css'
const About = () => {
  return (
    <>
    <div className='About'>
      <div className="Story">
        <span>Our Story</span>
        <p>Launched in 2015, Exlusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exlusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
        </p>
        <p>
        Exlusive offers more than 1 million products and is growing rapidly. It provides a diverse assortment of categories ranging from consumer goods to other essentials. </p>
      </div>
      <div className="right_img">
        <img src={rightimg} alt="" />
      </div>
    
    
    </div>


</>
  )
}

export default About
