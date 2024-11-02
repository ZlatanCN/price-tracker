import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '@/lib/utils';

const scrapeProduct = async (url) => {
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('span.priceToPay'),
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $('span.aok-offscreen'),
    );
    const originalPrice = extractPrice(
      $('#priceBlock_our'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPriceValue'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-base'),
    );
    const outOfStock = $('#availability span').text().trim().toLowerCase() ===
      'currently unavailable';
    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';
    const imageUrls = Object.keys(JSON.parse(images));
    const currency = extractCurrency($('.a-price-symbol'));
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');
    const description = extractDescription($);

    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(currentPrice) || Number(originalPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    console.log(data);
    return data;
  } catch (error) {
    console.log(`Failed to scrape product - @lib/scraper/index.js: ${error.message}`);
  }
};

export default scrapeProduct;