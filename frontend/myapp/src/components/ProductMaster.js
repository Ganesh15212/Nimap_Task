import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductMaster = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page]);

  const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:5000/products?page=${page}`);
    setProducts(response.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:5000/categories");
    setCategories(response.data);
  };

  const handleSubmit = async () => {
    if (editProductId) {
      await axios.put(`http://localhost:5000/products/${editProductId}`, {
        name: productName,
        category_id: categoryId,
      });
      setEditProductId(null);
    } else {
      await axios.post("http://localhost:5000/products", {
        name: productName,
        category_id: categoryId,
      });
    }
    setProductName("");
    setCategoryId("");
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditProductId(product.ProductId);
    setProductName(product.ProductName);
    setCategoryId(product.CategoryId);
  };

  const handleDelete = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    fetchProducts();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product Master</h2>

      {/* Add or Edit Product Form */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
            />
          </div>
          <div className="input-group mb-3">
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
          >
            {editProductId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.ProductId}>
                  <td>{product.ProductId}</td>
                  <td>{product.ProductName}</td>
                  <td>{product.CategoryName}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(product.ProductId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductMaster;

