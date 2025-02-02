const API_URL = "http://localhost:8000/api";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products/`);
    console.log(response)
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch historical data for a specific ticker
export const fetchHistoricalData = async (ticker) => {
  try {
    const response = await fetch(`${API_URL}/historical-data/${ticker}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
};

// Create a new product
export const createProduct = async (newProduct) => {
  try {
    const response = await fetch(`${API_URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

// Update an existing product
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await fetch(`${API_URL}/products/${id}/`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
