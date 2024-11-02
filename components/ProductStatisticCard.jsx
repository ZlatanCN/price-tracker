import PropTypes from 'prop-types';
import Image from 'next/image';

const ProductStatisticCard = (props) => {
  return (
    <main className={`price-info_card`}>
      <p className={'text-base text-black-100'}>
        {props.title}
      </p>
      <figure className={'flex gap-1'}>
        <Image
          src={props.icon}
          alt={props.title}
          width={24}
          height={24}
        />
        <p className={'text-2xl font-bold text-secondary'}>
          {props.value}
        </p>
      </figure>
    </main>
  );
};

ProductStatisticCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string,
};

export default ProductStatisticCard;
