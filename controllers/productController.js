const Product = require('../models/productModel');
const {
  getPostData
} = require('../utils');

// @desc  Gets all Products
// @route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// @desc  Gets Single Products
// @route GET /api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify({
        message: 'Product not found',
      }));
    } else {
      res.writeHead(200, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc  Create a Product
// @route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const {
      title,
      description,
      price
    } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    }
    const newProduct = await Product.create(product);

    res.writeHead(201, {
      'Content-Type': 'application/json',
    });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc  UPDATE Single Product
// @route POST /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify({
        message: 'Product not found',
      }));
    } else {
      const body = await getPostData(req);

      const {
        title,
        description,
        price,
      } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      }
      const updateProduct = await Product.update(id, productData);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      return res.end(JSON.stringify(updateProduct));
    }

  } catch (error) {
    console.log(error);
  }
}

// @desc  Delete Single Product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify({
        message: 'Product not found',
      }));
    } else {
      await Product.remove(id);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      return res.end(JSON.stringify({
        message: `Product ${id} deleted`,
      }));
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}