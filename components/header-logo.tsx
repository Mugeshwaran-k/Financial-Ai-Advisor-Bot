import Image from 'next/image';
import Link from 'next/link';

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center lg:flex">
        <Image src="/logo.svg" alt="logo" height={28} width={28} />
        <p className="ml-2.5 text-2xl font-semibold text-white">FinanceApp</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
