'use client';

import { ConfigProvider, Input } from 'antd';
import { searchInputTheme } from '@/themes/inputTheme';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { scrapeAndStoreProduct } from '@/lib/actions';

const SearchInput = () => {
  const [productLink, setProductLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      return hostname.includes('amazon.') || hostname.endsWith('amazon');
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(productLink)) {
      return alert('Invalid URL, please enter an Amazon product link');
    } else {
      try {
        setIsLoading(true);

        const response = await scrapeAndStoreProduct(productLink);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      className={'flex flex-wrap gap-4 mt-12'}
      onSubmit={handleSubmit}
    >
      <ConfigProvider theme={searchInputTheme}>
        <Input
          type={'text'}
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
          placeholder={'Enter product link'}
          size={'large'}
          className={'flex-1 min-w-[200px] w-full p-3'}
        />
      </ConfigProvider>
      <button
        type={'submit'}
        className={'searchbar-btn'}
      >
        {isLoading ? <LoadingOutlined/> : 'Search'}
      </button>
    </form>
  );
};

export default SearchInput;
