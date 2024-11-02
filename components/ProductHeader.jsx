import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

const ProductHeader = (props) => {
  return (
    <section
      className={'flex justify-between items-start gap-5 flex-wrap pb-6'}>
      <article className={'flex flex-col gap-3'}>
        <p className={'text-[28px] text-secondary font-semibold'}>
          {props.product.title}
        </p>

        <Link
          href={props.product.url}
          target={'_blank'}
          className={'text-base text-black opacity-50 hover:underline'}
        >
          Visit Product
        </Link>
      </article>

      <div className={'flex items-center gap-3'}>
        <figure className={'product-hearts'}>
          <Image
            src={'/assets/icons/red-heart.svg'}
            alt={'heart'}
            width={20}
            height={20}
          />
          <p className={'text-base font-semibold text-[#D46F77]'}>
            {props.product.reviewsCount}
          </p>
        </figure>
        <figure className={'p-2 bg-white-200 rounded-10'}>
          <Image
            src={'/assets/icons/bookmark.svg'}
            alt={'bookmark'}
            width={20}
            height={20}
          />
        </figure>
        <figure className={'p-2 bg-white-200 rounded-10'}>
          <Image
            src={'/assets/icons/share.svg'}
            alt={'share'}
            width={20}
            height={20}
          />
        </figure>
      </div>
    </section>
  );
};

ProductHeader.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductHeader;
