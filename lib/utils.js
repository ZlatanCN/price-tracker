const extractPrice = (...elements) => {
  for (let element of elements) {
    const priceText = element.first().text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '');

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }

      return firstPrice || cleanPrice;
    }
  }

  return '';
};

const extractCurrency = (element) => {
  const currencyText = element.text().trim().slice(1, 2);
  return currencyText ? currencyText : '';
};

const extractDescription = ($) => {
  const selectors = [
    '.a-unordered-list .a-list-item',
    '.a-expander-content p',
  ];

  for (let selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      return elements.
        map((_, element) => $(element).text().trim()).
        get().
        join('\n');
    }

    return '';
  }
};

const getHighestPrice = (priceList) => {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
};

const getLowestPrice = (priceList) => {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
};

const getAveragePrice = (priceList) => {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  return sumOfPrices / priceList.length || 0;
};

const formatNumber = (num = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export {
  extractPrice,
  extractCurrency,
  extractDescription,
  getHighestPrice,
  getLowestPrice,
  getAveragePrice,
  formatNumber,
};