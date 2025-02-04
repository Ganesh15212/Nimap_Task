const db = require('../model/db');

exports.getCategories = (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createCategory = (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO categories (CategoryName) VALUES (?)', [name], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId });
    });
};

exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE categories SET CategoryName = ? WHERE CategoryId = ?', [name, id], err => {
        if (err) throw err;
        res.json({ message: 'Category updated successfully' });
    });
};

exports.deleteCategory = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categories WHERE CategoryId = ?', [id], err => {
        if (err) throw err;
        res.json({ message: 'Category deleted successfully' });
    });
};
