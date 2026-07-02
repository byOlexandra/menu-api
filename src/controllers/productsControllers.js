import { Schema } from 'mongoose';
import { Product } from '../models/product.js';

export const getProducts = async (req, res) => {
  const menu = await Product.find();
  res.status(200).json(menu);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json(product);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({
    _id: productId,
  });

  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }
  res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    returnDocument: 'after',
  });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
};
