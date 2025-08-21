import { useState } from 'react';
import upload from '../../assets/upload_image.png';
import './AddProducts.css';
import { toast, ToastContainer } from 'react-toastify';

const AddProducts = () => {
  // Initialize images array for 6 images
  const [images, setImages] = useState([null, null, null, null, null, null]);
  const [colors, setColors] = useState([{ name: '', hex: '' }]);

  const [productDetails, setProductDetails] = useState({
    name: '',
    description:'',
    image: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    category: '',
    oldprice: '',
    solde: '',
    newPrice: '',
    available: true,
    Size: ["XS", "S", "M", "L", "XL"], // default all sizes selected

  });
  

  // Handle file selection and update images array
  const imageHandler = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };
  // Upload all images, then add product
  const AddProduct = async () => {
    try {
      // Prepare FormData for all selected images
      const formData = new FormData();
      // eslint-disable-next-line no-unused-vars
      images.forEach((imgFile, idx) => {
        if (imgFile) {
          formData.append('images', imgFile);
        }
      });

      // Upload images to backend
      const uploadResponse = await fetch('http://localhost:4000/upload-multiple', {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.success) {
        toast.error('Image upload failed!');
        return;
      }

      // Assign URLs from backend to productDetails fields
      const urls = uploadResult.image_urls;
      setProductDetails((prev) => ({
        ...prev,
        image: urls[0] || '',
        image1: urls[1] || '',
        image2: urls[2] || '',
        image3: urls[3] || '',
        image4: urls[4] || '',
        image5: urls[5] || '',
      }));

      // Prepare final product data
      const productToSend = {
        ...productDetails,
        image: urls[0] || '',
        image1: urls[1] || '',
        image2: urls[2] || '',
        image3: urls[3] || '',
        image4: urls[4] || '',
        image5: urls[5] || '',
        color:colors,
        available: Boolean(productDetails.available),
        oldprice: Number(productDetails.oldprice),
        solde: Number(productDetails.solde),
        newPrice: Number(productDetails.newPrice),
      };

      // Send product details to backend
      const productResponse = await fetch('http://localhost:4000/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSend),
      });

      const productResult = await productResponse.json();

      if (productResult.success) {
        toast.success('Product added successfully!');
        // Reset form if you want:
        setImages([null, null, null, null, null, null]);
        setProductDetails({
          name: '',
          description:'',
          image: '',
          image1: '',
          image2: '',
          image3: '',
          image4: '',
          image5: '',
          category: '',
          oldprice: '',
          solde: '',
          newPrice: '',
          available: true,
        });
        setColors([{ name: '', hex: '' }]);
      } else {
        toast.error('Failed to add product!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

    // Handle text inputs and selects
    const changeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setProductDetails({
        ...productDetails,
        [name]: type === 'checkbox' ? checked : value,
        });
    };
    return (
    <div className="AddProd">
      <ToastContainer />
      <h1> ADD PRODUCT</h1>
      <div className="addproduct-itemfield">
        <label>Product Title</label>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <label>Product Description</label>
        <input
          type="text"
          name="description"
          value={productDetails.description}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <label>Old Price</label>
        <input
          type="number"
          name="oldprice"
          value={productDetails.oldprice}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-itemfield">
        <label>Solde (%)</label>
        <input
          type="number"
          name="solde"
          value={productDetails.solde}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-itemfield">
        <label>New Price</label>
        <input
          type="number"
          name="newPrice"
          value={productDetails.newPrice}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-itemfield">
        <label>Product Categories</label>
        <select
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
          className="addproduct_category"
        >
          <option value="">Choose product category</option>
          <option value="mens-fashion">Mens Fashion</option>
          <option value="women-fashion">Womens Fashion</option>
          <option value="kids">Kids</option>
          <option value="Phones">Phones</option>
          <option value="Tv">Tv</option>
          <option value="Games">Games</option>
        </select>
      </div>
      {/*Product colors*/}
      <div className="color-box">
      <div className="addproduct-itemfield">
        <label>Product Colors</label>
        {colors.map((color, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Color name (e.g., White)"
              value={color.name}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[index].name = e.target.value;
                setColors(newColors);
              }}
            />
            <input
              type="color"
              value={color.hex}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[index].hex = e.target.value;
                setColors(newColors);
              }}
            />
            <button
              type="button"
              onClick={() => {
                const newColors = colors.filter((_, i) => i !== index);
                setColors(newColors);
              }}
            >
              ❌
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setColors([...colors, { name: '', hex: '#000000' }])}
          className="addproduct-btn mt-2"
        >
          + Add Color
        </button>
      </div>
      </div>

      <div className="addproduct-itemfield">
        <label>Available Sizes</label>
        <div className="size-options">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <label key={size} style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                value={size}
                checked={productDetails.Size.includes(size)}
                onChange={(e) => {
                  const updatedSizes = [...productDetails.Size];
                  if (e.target.checked) {
                    updatedSizes.push(size);
                  } else {
                    const index = updatedSizes.indexOf(size);
                    if (index > -1) {
                      updatedSizes.splice(index, 1);
                    }
                  }
                  setProductDetails({ ...productDetails, Size: updatedSizes });
                }}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <div className="addproduct-itemfield">
        <label>
          <input
            type="checkbox"
            name="available"
            checked={productDetails.available}
            onChange={changeHandler}
          />
          Product Available
        </label>
      </div>

        <div className="addproduct-images-container">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`addProduct-itemfield ${
                index === 0 ? 'thumbnail-wrapper' : 'detail-image-wrapper'
              }`}
            >
              <label htmlFor={`file_input_${index}`}>
                <img
                  src={images[index] ? URL.createObjectURL(images[index]) : upload}
                  alt={`upload-${index}`}
                  className={`addproduct-thumbnail-img ${
                    index === 0 ? 'main-thumbnail' : 'detail-thumbnail'
                  }`}
                />
              </label>
              <input
                type="file"
                id={`file_input_${index}`}
                onChange={(e) => imageHandler(e, index)}
                style={{ display: 'none' }}
                accept="image/*"
              />
            </div>
          ))}
        </div>


      <button onClick={AddProduct} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProducts;
