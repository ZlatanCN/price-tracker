import { getProductById, getSimilarProducts } from '@/lib/actions';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import ProductInfo from '@/components/ProductInfo';
import ProductHeader from '@/components/ProductHeader';
import ProductStatistic from '@/components/ProductStatistic';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);
  const similarProducts = await getSimilarProducts(id);
  const plainProduct = JSON.parse(JSON.stringify(product));

  if (!product) {
    redirect('/');
  }

  return (
    <div className={'product-container'}>
      <section className={'flex gap-28 xl:flex-row flex-col'}>
        <figure className={'product-image'}>
          <Image
            src={plainProduct.image}
            alt={plainProduct.title}
            width={580}
            height={400}
            className={'mx-auto'}
          />
        </figure>

        <div className={'flex-1 flex flex-col'}>
          <ProductHeader product={plainProduct}/>
          <ProductInfo product={plainProduct}/>
          <ProductStatistic product={plainProduct}/>
          <ProductModal product={plainProduct}/>
        </div>
      </section>

      <section className={'flex flex-col gap-16'}>
        <div className={'flex flex-col gap-5'}>
          <h3 className={'text-2xl text-secondary font-semibold'}>
            Description
          </h3>
          <main className={'flex flex-col gap-4'}>
            {plainProduct?.description?.split('\n')}
          </main>
        </div>

        <button
          className={'btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]'}>
          <Image
            src={'/assets/icons/bag.svg'}
            alt={'check'}
            width={26}
            height={26}
          />
          <Link
            href={'/'}
            className={'text-base text-white'}
          >
            Buy Now
          </Link>
        </button>
      </section>

      {similarProducts && similarProducts?.length > 0 && (
        <section className={'py-14 flex flex-col gap-2 w-full'}>
          <p className={'section-text'}>
            Similar Products
          </p>
          <div className={'flex flex-wrap gap-10 mt-7 w-full'}>
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;