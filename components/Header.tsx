import Link from 'next/link';
import Image from 'next/image';
import { FaMagnifyingGlass, FaCompass, FaCirclePlus } from 'react-icons/fa6';
import { HeaderLoginButton } from './LoginButton';
import { auth } from '@/auth';

export const links = [
  {
    icon: FaCompass,
    name: '見つける',
    to: '/',
  },
  {
    icon: FaMagnifyingGlass,
    name: '探す',
    to: '/search',
  },
  {
    icon: FaCirclePlus,
    name: '作る',
    to: '/contacts',
  },
];

export default async function Header() {
  const session = await auth();

  return (
    <div className="top-0 z-40 w-full bg-base-200 drop-shadow-md sm:fixed">
      <div className="navbar mx-auto max-w-5xl justify-center">
        {/* サイトタイトル */}
        <div className="sm:flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image
              src="/img/icon.webp"
              alt="ロゴ"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl">チャレンジ AI クイズ</span>
          </Link>
        </div>

        {/* PCメニュー */}
        <div className="hidden flex-none sm:flex">
          {links.map((link) => (
            <Link href={link.to} key={link.name} className="btn btn-ghost px-3">
              <link.icon className="size-4" />
              <span className="text-base font-normal">{link.name}</span>
            </Link>
          ))}

          {session ? (
            <Link href="/mypage" className="btn btn-ghost">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={session.user?.image!}
                alt="ユーザー画像"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-base font-normal">マイページ</span>
            </Link>
          ) : (
            <HeaderLoginButton />
          )}
        </div>
      </div>
    </div>
  );
}
