import React, { useState } from "react";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (name && price) {
      setProducts([...products, { name, price }]);
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Product Management</h2>
      <div className="bg-white p-4 shadow rounded-lg">
        <form onSubmit={handleAddProduct} className="mb-4">
          <div className="mb-4">
            <label htmlFor="product-name" className="block text-gray-700">
              Product Name:
            </label>
            <input
              type="text"
              id="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product-price" className="block text-gray-700">
              Price:
            </label>
            <input
              type="number"
              id="product-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
        <div id="product-list">
          <h3 className="text-xl font-bold mb-2">Products</h3>
          <ul className="list-disc list-inside">
            {products.map((product, index) => (
              <li key={index}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
