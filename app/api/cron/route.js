import connectToDB from '@/lib/mongoose';
import Product from '@/lib/models/productModel';
import scrapeProduct from '@/lib/scraper';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '@/lib/utils';
import {
  generateEmailBody,
  getNotificationType,
  sendEmail,
} from '@/lib/nodemailer';
import { NextResponse } from 'next/server';

export const maxDuration = 300; // This function can run for a maximum of 300 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    connectToDB();

    const products = await Product.find({});
    if (!products) {
      throw new Error('No products found');
    }

    const updatedProducts = await Promise.all(products.map(
      async (product) => {
        const scrapedProduct = await scrapeProduct(product.url);

        if (!scrapedProduct) {
          throw new Error('Failed to scrape product');
        } else {
          const updatedPriceHistory = [
            ...scrapedProduct.priceHistory,
            { price: scrapedProduct.currentPrice },
          ];

          let updatedProduct = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory),
          };

          updatedProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            updatedProduct,
          );

          const emailNotificationType = getNotificationType(scrapedProduct,
            product);
          if (emailNotificationType && updatedProduct.users.length > 0) {
            const productInfo = {
              title: updatedProduct.title,
              url: updatedProduct.url,
            };

            const emailContent = generateEmailBody(productInfo,
              emailNotificationType);
            const userEmails = updatedProduct.users.map((user) => user.email);
            await sendEmail(emailContent, userEmails);
          }

          return updatedProduct;
        }
      },
    ));

    return NextResponse.json({
      status: 'success',
      message: 'Products updated',
      data: updatedProducts,
    });
  } catch (error) {
    throw new Error(
      `Failed to get similar products - @lib/actions/index.js: ${error.message}`);
  }
};