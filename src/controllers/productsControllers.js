import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getProducts = async (req, res, next) => {
  try {
    const {
      lang,
      category,
      available,
      minPrice,
      maxPrice,
      search,
      sortBy,
      order,
      page,
      limit,
    } = req.query;

    const currentLang = lang === 'ua' ? 'ua' : 'en';

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (available) {
      filter.isAvailable = available === 'true';
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { 'name.ua': { $regex: search, $options: 'i' } },
        { 'name.en': { $regex: search, $options: 'i' } },
      ];
    }

    const sortField = sortBy || 'price';
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = { [sortField]: sortOrder };

    const currentPage = Number(page) || 1;
    const currentLimit = Number(limit) || 25;
    const skip = (currentPage - 1) * currentLimit;

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(currentLimit)
      .lean();

    const searchedProducts = products.map((p) => {
      return {
        ...p,
        name: p.name[currentLang],
        description: p.description[currentLang],
      };
    });

    res.status(200).json({
      status: 'success',
      results: searchedProducts.length,
      page: currentPage,
      limit: currentLimit,
      data: searchedProducts,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({
      _id: productId,
    });

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      {
        returnDocument: 'after',
      },
    );
    if (!product) {
      throw createHttpError(404, 'Product not found');
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
