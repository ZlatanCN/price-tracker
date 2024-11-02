import PropTypes from 'prop-types';
import ProductStatisticCard from '@/components/ProductStatisticCard';
import { formatNumber } from '@/lib/utils';

const ProductStatistic = (props) => {
  return (
    <section className={'my-7 flex flex-col gap-5'}>
      <div className={'flex gap-5 flex-wrap'}>
        <ProductStatisticCard
          title={'Current Price'}
          icon={'/assets/icons/price-tag.svg'}
          value={`${props.product.currency} ${formatNumber(
            props.product.currentPrice)}`}
        />
        <ProductStatisticCard
          title={'Average Price'}
          icon={'/assets/icons/chart.svg'}
          value={`${props.product.currency} ${formatNumber(
            props.product.averagePrice)}`}
        />
        <ProductStatisticCard
          title={'Highest Price'}
          icon={'/assets/icons/arrow-up.svg'}
          value={`${props.product.currency} ${formatNumber(
            props.product.highestPrice)}`}
        />
        <ProductStatisticCard
          title={'Lowest Price'}
          icon={'/assets/icons/arrow-down.svg'}
          value={`${props.product.currency} ${formatNumber(
            props.product.lowestPrice)}`}
        />
      </div>
    </section>
  );
};

ProductStatistic.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductStatistic;
