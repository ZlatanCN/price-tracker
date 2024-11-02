import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = (props) => {
  return (
    <Link href={`/product/${props.product._id}`} className={'product-card'}>
      <figure className={'product-card_img-container'}>
        <Image
          src={props.product.image}
          alt={props.product.title}
          width={200}
          height={200}
          className={'product-card_img'}
        />
      </figure>

      <main className={'flex flex-col gap-3'}>
        <h3 className={'product-title'}>
          {props.product.title}
        </h3>
        <div className={'flex justify-between'}>
          <p className={'text-black opacity-50 text-lg capitalize'}>
            {props.product.category}
          </p>
          <p className={'text-black text-lg font-semibold'}>
            <span>
              {props.product?.currency}
              {props.product?.currentPrice}
            </span>
          </p>
        </div>
      </main>
    </Link>
  );
};

ProductCard.propTypes = {
  key: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
