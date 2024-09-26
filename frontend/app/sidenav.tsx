import Link from 'next/link';
import NavLinks from '@/app/nav-links';
import ItSocietyLogo from '@/app/itsociety-logo';
import Image from 'next/image';
import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { clearUser } from '../features/auth/userSlice';

export default function SideNav() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 overflow-y-auto">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          {/* <ItSocietyLogo /> */}
            <Image
                src="/itsociety.png"
                alt="ITSociety Badges"
                width={160}
                height={40}
                priority
            />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {user && user.id ? (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600"
          >
            <PowerIcon className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        ) : (
          <Link href="/login" className="flex items-center space-x-2 text-blue-600">
            <UserIcon className="h-5 w-5" />
            <span>Log In</span>
          </Link>
        )}
      </div>
    </div>
  );
}