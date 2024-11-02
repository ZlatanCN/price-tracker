'use server';

import { revalidatePath } from 'next/cache';
import scrapeProduct from '@/lib/scraper';
import connectToDB from '@/lib/mongoose';
import Product from '@/lib/models/productModel';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '@/lib/utils';
import { generateEmailBody, sendEmail } from '@/lib/nodemailer';
import chalk from 'chalk';

const scrapeAndStoreProduct = async (url) => {
  try {
    // Connect to the database
    connectToDB();
    // Scrape the product
    let product = await scrapeProduct(url);
    // Store the product
    if (!product) {
      return;
    } else {
      const existingProduct = await Product.findOne({
        url: product.url,
      });

      if (existingProduct) {
        const updatedPriceHistory = [
          ...existingProduct.priceHistory,
          { price: product.currentPrice },
        ];

        product = {
          ...product,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };
      }

      const newProduct = await Product.findOneAndUpdate({
        url: product.url,
      }, product, {
        new: true,
        upsert: true,
      });

      revalidatePath(`/product/${newProduct._id}`);
    }
  } catch (error) {
    console.log(
      `Failed to scrape and store product - @lib/actions/index.js: ${error.message}`);
  }
};

const getProductById = async (id) => {
  try {
    connectToDB();
    return await Product.findById(id);
  } catch (error) {
    console.log(
      `Failed to get product by ID - @lib/actions/index.js: ${error.message}`);
  }
};

const getAllProducts = async () => {
  try {
    connectToDB();
    return await Product.find();
  } catch (error) {
    console.log(
      `Failed to get all products - @lib/actions/index.js: ${error.message}`);
  }
};

const getSimilarProducts = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    const similarProducts = await Product.find({
      category: product.category,
      currentPrice: {
        $gte: product.currentPrice * 0.8,
        $lte: product.currentPrice * 1.2,
      },
      _id: { $ne: id },
    }).sort({ userRating: -1 }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(
      `Failed to get similar products - @lib/actions/index.js: ${error.message}`);
  }
};

const addUserEmailToProduct = async (productId, userEmail) => {
  try {
    const product = await Product.findById(productId);

    if (!product) return;

    const userExists = product.users.some((user) => user.email === userEmail);

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = generateEmailBody(product, 'WELCOME');
      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(chalk(`Failed to add user email to product - @lib/actions/index.js: ${error.message}`));
  }
};

export {
  scrapeAndStoreProduct,
  getProductById,
  getAllProducts,
  getSimilarProducts,
  addUserEmailToProduct,
};