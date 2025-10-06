import { Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import WalletConnection from '@/components/connect-wallet';
import { AppIcon } from '@/components/shared';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/shared/sheet/sheet';
import { HamburgerMenu } from '@/components/hamburger-menu';

// Define an interface for navigation links
interface NavLink {
  name: string;
  path: string;
  external?: boolean; // Optional property to indicate if the link is external
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getLinkStyle = (path: string) => {
    return location.pathname === path
      ? 'text-[1rem] font-bold text-[#4C32F2] dark:hover:text-dark-primary'
      : 'text-[1rem] font-bold text-[#22005D] dark:text-dark-foreground';
  };

  // Define an array of navigation links
  const navLinks: NavLink[] = [
    { name: 'Markets', path: '/markets' },
    { name: 'Proposed Market', path: '/proposed-market' },
    { name: 'Whitepaper', path: '#' },
    { name: 'Blog', path: 'https://foreonnetwork.medium.com/', external: true },
    { name: 'Community', path: '#' },
  ];

  return (
    <div className="relative w-full bg-primary-95 dark:bg-dark-background lg:px-10">
      <div className="flex items-center justify-between px-4 py-6 lg:container lg:px-12">
        <div className="flex items-center gap-4">
          <HamburgerMenu />
          <Link to="/">
            <AppIcon
              className="h-6 w-[5.625] lg:h-10 lg:w-[7.5rem]"
              height="2.5rem"
              name="Logo"
              width="7.5rem"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:w-fit lg:gap-[3.4375rem]">
          <div className="hidden flex-1 justify-between lg:flex lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                className={getLinkStyle(link.path)}
                to={link.path}
                target={link.external ? '_blank' : '_self'} // Open external links in a new tab
              >
                {link.name}
              </Link>
            ))}
          </div>
          <WalletConnection />
          <Sheet
            open={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
          >
            <SheetTrigger
              asChild
              className="block lg:hidden"
            >
              <AppIcon name="menu_icon" />
            </SheetTrigger>
            <SheetContent
              className="h-fit w-screen bg-white p-4"
              side={'right'}
            >
              <div className="grid justify-items-center gap-10 py-[5.625rem]">
                <SheetClose asChild>
                  <div className="absolute right-6 top-7 rounded-full border border-muted bg-white p-2">
                    <Cross2Icon className="text-[#A2A2BA]" />
                  </div>
                </SheetClose>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    className={getLinkStyle(link.path)}
                    to={link.path}
                    target={link.external ? '_blank' : '_self'}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
