import PropTypes from 'prop-types';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';

const ProductInfo = (props) => {
  return (
    <section className={'product-info'}>
      <section className={'flex flex-col gap-2'}>
        <p className={'text-[34px] text-secondary font-bold'}>
          {props.product.currency} {formatNumber(props.product.currentPrice)}
        </p>
        <p className={'text-[21px] text-black opacity-50 line-through'}>
          {props.product.currency} {formatNumber(props.product.originalPrice)}
        </p>
      </section>

      <section className={'flex flex-col gap-4'}>
        <div className={'flex gap-3'}>
          <figure className={'product-stars'}>
            <Image
              src={'/assets/icons/star.svg'}
              alt={'star'}
              width={16}
              height={16}
            />
            <p className={'text-sm text-primary-orange font-semibold'}>
              {props.product.stars || 25}
            </p>
          </figure>
          <figure className={'product-reviews'}>
            <Image
              src={'/assets/icons/comment.svg'}
              alt={'comment'}
              width={16}
              height={16}
            />
            <p className={'text-sm text-secondary font-semibold'}>
              {props.product.reviewsCount} Reviews
            </p>
          </figure>
        </div>

        <p className={'text-sm text-black opacity-50'}>
          <span className={'text-primary-green font-semibold'}>93% </span>
          of buyers have commended this.
        </p>
      </section>
    </section>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInfo;
