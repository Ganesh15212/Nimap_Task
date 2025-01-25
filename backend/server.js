const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv=require("dotenv");

const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();
const password=process.env.PASSWORD;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'task',
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// CRUD for Categories
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/categories', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO categories (CategoryName) VALUES (?)', [name], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId });
    });
});

app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE categories SET CategoryName = ? WHERE CategoryId = ?', [name, id], err => {
        if (err) throw err;
        res.json({ message: 'Category updated successfully' });
    });
});

app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categories WHERE CategoryId = ?', [id], err => {
        if (err) throw err;
        res.json({ message: 'Category deleted successfully' });
    });
});

// CRUD for Products
app.get('/products', (req, res) => {
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
});

app.post('/products', (req, res) => {
    const { name, category_id } = req.body;
    db.query('INSERT INTO products (ProductName, CategoryId) VALUES (?, ?)', [name, category_id], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId });
    });
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, category_id } = req.body;
    db.query('UPDATE products SET ProductName = ?, CategoryId = ? WHERE ProductId = ?', [name, category_id, id], err => {
        if (err) throw err;
        res.json({ message: 'Product updated successfully' });
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE ProductId = ?', [id], err => {
        if (err) throw err;
        res.json({ message: 'Product deleted successfully' });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
