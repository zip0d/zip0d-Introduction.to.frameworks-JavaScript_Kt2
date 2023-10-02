import React, { useState } from 'react';
import './App.css';

const ProductItem = ({ product, onUpdateCount, onDeleteProduct }) => {
  const { id, name, price, count } = product;

  const handleIncrement = () => {
    if (count < 25) {
      onUpdateCount(id, count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      onUpdateCount(id, count - 1);
    } else {
      onDeleteProduct(id);
    }
  };

  const handleDelete = () => {
    onDeleteProduct(id);
  };

  return (
    <div className="product-item" onDoubleClick={handleDelete}>
      <div className="product-info">
        <span className="product-name">{name}</span>
        <span className="product-price">{price}</span>
      </div>
      <div className="product-actions">
        <button onClick={handleDecrement}>-</button>
        <span className="product-count">{count}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([
    { id: Date.now(), name: 'Велосипед', price: 1000, count: 1 },
    { id: Date.now() + 1, name: 'Самокат', price: 700, count: 1 },
    { id: Date.now() + 2, name: 'Ролики', price: 1300, count: 2 },
    { id: Date.now() + 3, name: 'Сноуборд', price: 1000, count: 4 }
  ]);

  const addProduct = () => {
    const input = prompt('Введите имя и цену товара ');
    if (input) {
      const [productName, productPrice] = input.split(' ');
      const newProduct = {
        id: Date.now(),
        name: productName,
        price: parseFloat(productPrice),
        count: 1
      };
      setData([...data, newProduct]);
    }
  };

  const updateProductCount = (productId, newCount) => {
    if (newCount === 0) {
      deleteProduct(productId);
    } else {
      const updatedData = data.map(product =>
        product.id === productId ? { ...product, count: newCount } : product
      );
      setData(updatedData);
    }
  };

  const deleteProduct = (productId) => {
    const updatedData = data.filter(product => product.id !== productId);
    setData(updatedData);
  };

  return (
    <div className="app">
      <div className="add-button-container">
        <button onClick={addProduct} className="add-button">Добавить товар</button>
      </div>
      <div className="product-list">
        {data.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onUpdateCount={updateProductCount}
            onDeleteProduct={deleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default App;