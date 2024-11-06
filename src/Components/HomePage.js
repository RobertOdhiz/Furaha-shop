import React, { useEffect, useState } from 'react';
import './Styles/HomePage.css';
import TopPage2 from './../assets/Top_Page_2.png';
import { useNavigate } from 'react-router-dom';
import Card from './SemiComponents/Card';
import { findRelatedProducts } from '../Utils/RelatedProducts';
import Footer from './SemiComponents/Footer';
import Navbar from './SemiComponents/Navbar';
import { getData } from '../Utils/db';

function HomePage() {
  const navigate = useNavigate();
  const [ProductsData, setProductsData] = useState([]);

  const selectProductAndNavigate = (product) => {
    const related = findRelatedProducts(product, ProductsData);

    navigate(`/products/${product.title}${product.uuid}`, { state: { selectedProduct: product, relatedProducts: related } });
  };

  useEffect(() => {
    document.title = 'Furaha Shop | Home - Discover best Health options';
    const fetchData = async () => {
      try {
        const dataFromSheets = await getDataFromSheets();
        setProductsData(dataFromSheets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getDataFromSheets = async () => {
    try {
      const data = await getData('products');
      return data || [];
    } catch (error) {
      console.error('Error retrieving data from Google Sheets:', error); 
      return [];
    }
  };

  const firstFourProducts = ProductsData.slice(0, 4);

  return (
    <div>
      <Navbar />
      <div className='top-page'>
        <div className='img-container'>
          <img src={TopPage2} alt='' />
        </div>
        <div className='top-content'>
          <h1>Furaha Shop</h1>
          <p>Your one-stop online shop for Healthy Products with Free Delivery Countrywide</p>
          <button className='btn' onClick={() => navigate('/catalogue')}>
            <span>Shop Now</span>
            <i className="bi bi-arrow-right-short"></i>
          </button>
        </div>
      </div>
      <div className='products-container'>
        <h2>Products</h2>
        <p className='products-description'>Shop From us and enjoy exclusive discounts</p>
        <div className='products'>
          {firstFourProducts.map((item, key) => (
            <Card
              key={key}
              title={item.title}
              // description={item.des}
              price={item.price}
              image={item.imageURL}
              onClick={() => selectProductAndNavigate(item)}
            />
          ))}
        </div>
        <button className='view-all-btn' onClick={() => navigate('/catalogue')}>
          View All
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
