// **Frontend Update: Search Component**
// **File: src/components/Search.js**
import React, { useState } from 'react';
import axios from 'axios';

function Search() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [stockStatus, setStockStatus] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('/api/products/search', {
                params: { name, category, stockStatus },
            });
            setResults(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Search Products</h2>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <select value={stockStatus} onChange={(e) => setStockStatus(e.target.value)}>
                <option value="">Select Stock Status</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
            </select>
            <button onClick={handleSearch}>Search</button>

            <div>
                <h3>Results:</h3>
                <ul>
                    {results.map((product) => (
                        <li key={product._id}>{product.name} - {product.stockLevel}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Search;
