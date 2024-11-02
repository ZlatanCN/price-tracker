import Link from 'next/link';
import Image from 'next/image';
import { HeartOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = () => {
  return (
    <header className={'w-full'}>
      <nav className={'nav'}>
        <Link href={'/'} className={'flex items-center gap-1'}>
          <Image
            src={'/assets/icons/logo.svg'}
            width={27}
            height={27}
            alt={'logo'}
          />
          <p className={'nav-logo'}>
            Price
            <span className={'text-primary'}>
              Tracker
            </span>
          </p>
        </Link>

        <div className={'flex items-center gap-5'}>
          <SearchOutlined className={'cursor-pointer'}/>
          <HeartOutlined className={'cursor-pointer'}/>
          <UserOutlined className={'cursor-pointer'}/>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
