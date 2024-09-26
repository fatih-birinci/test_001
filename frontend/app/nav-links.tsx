'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import {
    HomeIcon,
    UserIcon,
    ChartPieIcon,         // Dashboard
    UsersIcon,            // Users
    BuildingOfficeIcon,   // Organizations/Groups
    ShieldCheckIcon,      // Badge-related actions (alternative to BadgeCheckIcon)
    AcademicCapIcon,      // Badge Issuers
    PhotoIcon,            // Graphics Library
    ArchiveBoxIcon,       // Managing Badges
    DocumentTextIcon,     // Manual Entry
    ArrowUpTrayIcon,      // Imported File
    UserGroupIcon,        // Using Groups
    IdentificationIcon,   // Using Users
    KeyIcon,              // API
    ListBulletIcon,       // Rule-based Issuing
    ChevronDownIcon,
    ClipboardDocumentIcon, // Manage (task management, claims management)
    MagnifyingGlassIcon,   // Review (review or inspect claims)
    ChartBarSquareIcon,    // Summary (reporting summary, overview)
    Bars3BottomLeftIcon,   // Detail (detailed view, bars list)
    ChatBubbleOvalLeftEllipsisIcon, // Social (social interactions, communications)
    DocumentCheckIcon,     // Claims (claims reporting, document checks)
  } from '@heroicons/react/24/outline';

  import Link from 'next/link';
  // import { usePathname } from 'next/navigation';
  import clsx from 'clsx';
  
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const links = [
  { name: 'Overview', href: '/overview', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartPieIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Organizations/Groups', href: '/organizations', icon: BuildingOfficeIcon },
  {   
      name: 'Preparing badges',
      icon: ShieldCheckIcon,
      sublinks: [
          { name: 'Badge Issuers', href: '/issuers', icon: AcademicCapIcon },
          { name: 'Graphics Library', href: '/graphics', icon: PhotoIcon },
          { name: 'Managing Badges', href: '/badges', icon: ArchiveBoxIcon },
      ]
  },
  {   
    name: 'Issuing Badges',
    icon: ShieldCheckIcon,
    sublinks: [
        { name: 'Manual Entry', href: '/issue/manual', icon: DocumentTextIcon },
        { name: 'Imported File', href: '/issue/file', icon: ArrowUpTrayIcon },
        { name: 'Using Groups', href: '/issue/group', icon: UserGroupIcon },
        { name: 'Using Users', href: '/issue/users', icon: IdentificationIcon },
        { name: 'API', href: '/issue/key', icon: KeyIcon },
        { name: 'Ruled-based Issuing', href: '/issue/rules', icon: ListBulletIcon },
    ]
  },
  {
    name: 'Claims',
    icon: ShieldCheckIcon,
    sublinks: [
        { name: 'Manage', href: '/claims', icon: ClipboardDocumentIcon },
        { name: 'Review', href: '/claims/review', icon: MagnifyingGlassIcon },
    ]
  },
  {   
    name: 'Reporting',
    icon: ChartBarSquareIcon,  // Reporting (general icon for reports)
    sublinks: [
        { name: 'Summary', href: '/reporting/summary', icon: ChartBarSquareIcon },
        { name: 'Detail', href: '/reporting/detail', icon: Bars3BottomLeftIcon },
        { name: 'Recipients', href: '/reporting/receipents', icon: UsersIcon },
        { name: 'Social', href: '/reporting/social', icon: ChatBubbleOvalLeftEllipsisIcon },
        { name: 'Claims', href: '/reporting/claims', icon: DocumentCheckIcon },
    ]
  }
];

  
  export default function NavLinks() {
    // const pathname = usePathname();
    const [openParent, setOpenParent] = useState<string | null>(null);
    const toggleParent = (parentName: string) => {
        setOpenParent(openParent === parentName ? null : parentName);
      };
    
    const user = useSelector((state: RootState) => state.user);

    const profileLinkExists = links.some(link => link.name === 'Profile');
  if (user && user.id && !profileLinkExists) {
    links.push({
      name: 'Profile',
      icon: UserIcon,
      href: '/profile',
    });
  }


    return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        return link.sublinks ? (
          <div key={link.name}>
            <button
              onClick={() => toggleParent(link.name)}
              className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
            >
              <div className="flex items-center gap-2">
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </div>
              <ChevronDownIcon
                className={`w-5 transition-transform duration-300 ${
                  openParent === link.name ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openParent === link.name && (
              <div className="pl-4">
                {link.sublinks.map((sublink) => {
                  const SublinkIcon = sublink.icon;
                  return (
                    <Link
                      key={sublink.name}
                      href={sublink.href}
                      className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
                    >
                      <SublinkIcon className="w-6" />
                      <p className="hidden md:block">{sublink.name}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={link.name}
            href={link.href}
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
  