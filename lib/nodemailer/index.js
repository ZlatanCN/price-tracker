import nodemailer from 'nodemailer';
import { getLowestPrice } from '@/lib/utils';

const NOTIFICATION = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
};

const THRESHOLD_PERCENTAGE = 40;

const generateEmailBody = (product, type) => {
  const shortenedTitle = product.title.length > 20 ? `${product.title.slice(0,
    20)}...` : product.title;
  let subject = '';
  let body = '';

  switch (type) {
    case NOTIFICATION.WELCOME:
      subject = `Welcome to Price Tracking for ${shortenedTitle}`;
      body = `
        <div>
          <h2>Welcome to PriceWise 🚀</h2>
          <p>You are now tracking ${product.title}.</p>
          <p>Here's an example of how you'll receive updates:</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} is back in stock!</h3>
            <p>We're excited to let you know that ${product.title} is now back in stock.</p>
            <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
            <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product Image" style="max-width: 100%;" />
          </div>
          <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
        </div>
      `;
      break;

    case NOTIFICATION.CHANGE_OF_STOCK:
      subject = `${shortenedTitle} is now back in stock!`;
      body = `
        <div>
          <h4>Hey, ${product.title} is now restocked! Grab yours before they run out again!</h4>
          <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;

    case NOTIFICATION.LOWEST_PRICE:
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.title} has reached its lowest price ever!!</h4>
          <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
        </div>
      `;
      break;

    case NOTIFICATION.THRESHOLD_MET:
      subject = `Discount Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.title} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;

    default:
      throw new Error('Invalid notification type.');
  }

  return { subject, body };
};

const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: 'wy1604010213@163.com',
    pass: 'GHVmCvFsMkKPr8aQ',
  },
});

const sendEmail = async (emailContent, recipients) => {
  const mailOptions = {
    from: 'PriceTracker < wy1604010213@163.com > ',
    to: recipients,
    html: emailContent.body,
    subject: emailContent.subject,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Failed to send email: ${error.message}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  })
}

const getNotificationType = (scrapedProduct, currentProduct) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return NOTIFICATION.LOWEST_PRICE
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return NOTIFICATION.CHANGE_OF_STOCK
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return NOTIFICATION.THRESHOLD_MET
  }

  return null;
}

export { generateEmailBody, sendEmail, getNotificationType };