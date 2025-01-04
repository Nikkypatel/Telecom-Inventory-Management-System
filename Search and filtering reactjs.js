import React, { useState } from "react";

function SearchFilter() {
  const [products] = useState([
    { name: "Product A", category: "Electronics", stock: 3 },
    { name: "Product B", category: "Furniture", stock: 0 },
    { name: "Product C", category: "Electronics", stock: 15 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "low" && product.stock < 10 && product.stock > 0) ||
      (filter === "out" && product.stock === 0);
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="search-filter" className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Search and Filtering</h2>
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by product name, category, or stock level"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="stock-filter" className="block text-gray-700">
            Filter by Stock Status:
          </label>
          <select
            id="stock-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
        <ul className="list-disc list-inside mt-4">
          {filteredProducts.map((product, index) => (
            <li key={index}>
              {product.name} ({product.category}) - {product.stock} in stock
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SearchFilter;
