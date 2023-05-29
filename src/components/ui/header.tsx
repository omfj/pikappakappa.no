"use client";

import Link from "next/link";
import React, {
  HTMLAttributes,
  createContext,
  useContext,
  useState,
} from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const HeaderContext = createContext<{
  isOpen: boolean;
  toggleOpen: () => void;
  setOpen: () => void;
  setClose: () => void;
}>({
  isOpen: false,
  toggleOpen: () => {},
  setClose: () => {},
  setOpen: () => {},
});

export const HeaderProvider = HeaderContext.Provider;

export const useHeader = () => useContext(HeaderContext);

export const Header = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const setOpen = () => setIsOpen(true);
  const setClose = () => setIsOpen(false);

  return (
    <HeaderContext.Provider
      value={{
        isOpen,
        toggleOpen,
        setOpen,
        setClose,
      }}
    >
      <header
        className="flex border-b justify-between flex-row items-baseline mb-4 p-4 md:p-8"
        ref={ref}
        {...props}
      >
        {children}
      </header>
    </HeaderContext.Provider>
  );
});
Header.displayName = "Header";

export const HeaderLogo = React.forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => {
  return (
    <h1
      className="text-4xl font-bold align-middle justify-center font-display"
      {...props}
    >
      {children}
    </h1>
  );
});
HeaderLogo.displayName = "HeaderLogo";

export type Route = {
  href: string;
  label: string;
};

export type NavigationProps = HTMLAttributes<HTMLDivElement> & {
  routes: Array<Route>;
};

export const Navigation = React.forwardRef<HTMLDivElement, NavigationProps>(
  ({ routes, children, ...props }, ref) => {
    const { isOpen, toggleOpen, setClose } = useHeader();

    return (
      <nav ref={ref} {...props}>
        <ul className="hidden md:flex flex-row items-center">
          {routes.map((route) => {
            return (
              <NavItem key={route.href} href={route.href}>
                {route.label}
              </NavItem>
            );
          })}
        </ul>
        <div className="block md:hidden flex-row items-center">
          <button onClick={toggleOpen}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
        {isOpen && (
          <div className="fixed space-y-4 inset-0 bg-background z-10 p-10">
            <div className="flex flex-row justify-end">
              <button onClick={setClose}>
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            <ul>
              {routes.map((route) => (
                <MobileNavItem key={route.href} href={route.href}>
                  {route.label}
                </MobileNavItem>
              ))}
            </ul>
          </div>
        )}
      </nav>
    );
  }
);
Navigation.displayName = "Navigation";

export type NavItemProps = HTMLAttributes<HTMLLIElement> & {
  href: string;
};

export const NavItem = React.forwardRef<HTMLLIElement, NavItemProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <li ref={ref} {...props}>
        <Link
          className="px-4 py-2 text-md font-medium align-middle rounded-lg hover:bg-muted transition-colors duration-200 ease-in-out"
          href={href}
        >
          {children}
        </Link>
      </li>
    );
  }
);
NavItem.displayName = "NavItem";

export const MobileNavItem = React.forwardRef<HTMLLIElement, NavItemProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <li ref={ref} {...props}>
        <Link
          className="block px-4 py-2 text-lg font-medium align-middle rounded-lg hover:bg-muted transition-colors duration-200 ease-in-out"
          href={href}
        >
          {children}
        </Link>
      </li>
    );
  }
);
MobileNavItem.displayName = "MobileNavItem";
