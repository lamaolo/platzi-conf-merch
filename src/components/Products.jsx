import React, { useContext } from 'react';

import Product from './Product';
import AppContext from '../context/AppContext';

import '../styles/components/Products.css';

const Products = () => {
  const { state, addToCart } = useContext(AppContext);
  const { products } = state;

  // declarando esta funcion como closure la podemos llamar directamente:
  /**
   * onClick={handleAddToCart(product)}
   * Si no estuviera la closure lo hacemos así:_
   * onClick={() => handleAddToCart(product)}
   */
  const handleAddToCart = (product) => () => {
    addToCart(product);
  };

  return (
    <div className="Products">
      <div className="Products-items">
        {products.map((product) => (
          <Product
            key={product.id}
            handleAddToCart={handleAddToCart}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
