import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryMaster = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
    };

    const handleSubmit = async () => {
        if (editId) {
            await axios.put(`http://localhost:5000/categories/${editId}`, { name: categoryName });
        } else {
            await axios.post('http://localhost:5000/categories', { name: categoryName });
        }
        setCategoryName('');
        setEditId(null);
        fetchCategories();
    };

    const handleEdit = (id, name) => {
        setCategoryName(name);
        setEditId(id);
    };

    const handleDelete = async id => {
        await axios.delete(`http://localhost:5000/categories/${id}`);
        fetchCategories();
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Category Master</h2>
            
            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="text"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                            placeholder="Category Name"
                        />
                        <button 
                            type="button" 
                            className="btn btn-primary ms-2"
                            onClick={handleSubmit}
                        >
                            {editId ? 'Update' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {categories.map(category => (
                            <li key={category.CategoryId} className="list-group-item d-flex justify-content-between align-items-center">
                                {category.CategoryName}
                                <div>
                                    <button 
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(category.CategoryId, category.CategoryName)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(category.CategoryId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CategoryMaster;
