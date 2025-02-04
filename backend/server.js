const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
