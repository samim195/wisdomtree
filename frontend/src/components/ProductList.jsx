import React, { useEffect, useState } from "react";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../api";
import './ProductList.css'; // Ensure you import the CSS here

const ProductList = ({ onSelectTicker }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    ticker: "",
  });
  const [editingProduct, setEditingProduct] = useState(null); // New state to track the product being edited

  // Fetch products on initial load
  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  // Handle product creation
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const createdProduct = await createProduct(newProduct);
    setProducts((prevProducts) => [...prevProducts, createdProduct]);
    setNewProduct({ name: "", ticker: "" }); // Reset form
  };

  // Start editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // Handle product update
  const handleUpdateProduct = async (id, updatedProduct) => {
    const updated = await updateProduct(id, updatedProduct);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? updated : product
      )
    );
    setEditingProduct(null); // Exit edit mode after update
  };

  // Handle product delete
  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  // Handle change in the form for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  return (
    <div className="container">
      <h2>Available Cryptocurrencies</h2>
      
      {/* Product Creation Form */}
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Product Ticker"
          value={newProduct.ticker}
          onChange={(e) => setNewProduct({ ...newProduct, ticker: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            {editingProduct && editingProduct.id === product.id ? (
              // Show edit form for the product being edited
              <div className="edit-form">
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="ticker"
                  value={editingProduct.ticker}
                  onChange={handleChange}
                  required
                />
                <button onClick={() => handleUpdateProduct(product.id, editingProduct)}>
                  Update
                </button>
                <button className="cancel-button" onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              // Show product details with an Edit button
              <div>
                <span onClick={() => onSelectTicker(product.ticker)}>
                  {product.name} ({product.ticker})
                </span>
                <button className="edit-button" onClick={() => handleEditProduct(product)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
