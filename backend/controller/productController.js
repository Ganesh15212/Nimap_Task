const db = require('../model/db');

exports.getProducts = (req, res) => {
    const { page = 1, size = 10 } = req.query;
    const offset = (page - 1) * size;

    const query = `
        SELECT p.ProductId , p.ProductName, 
               c.CategoryName, c.CategoryId
        FROM products p 
        JOIN categories c ON p.CategoryId = c.CategoryId 
        ORDER BY p.ProductId
        LIMIT ?, ?`;

    db.query(query, [parseInt(offset), parseInt(size)], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createProduct = (req, res) => {
    const { name, category_id } = req.body;
    db.query('INSERT INTO products (ProductName, CategoryId) VALUES (?, ?)', [name, category_id], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId });
    });
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, category_id } = req.body;
    db.query('UPDATE products SET ProductName = ?, CategoryId = ? WHERE ProductId = ?', [name, category_id, id], err => {
        if (err) throw err;
        res.json({ message: 'Product updated successfully' });
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE ProductId = ?', [id], err => {
        if (err) throw err;
        res.json({ message: 'Product deleted successfully' });
    });
};
