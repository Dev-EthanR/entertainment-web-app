"use client";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

interface Navlink {
  icon: string;
  href: string;
}

const Navbar = () => {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;

  const links: Navlink[] = [
    { icon: "/icon-nav-home.svg", href: "/" },
    { icon: "/icon-nav-movies.svg", href: "/movies" },
    { icon: "/icon-nav-tv-series.svg", href: "/tv-series" },
    { icon: "/icon-nav-bookmark.svg", href: "/bookmarks" },
  ];

  return (
    <div className="bg-primary-900 text-white w-full md:w-[calc(100vw-36px)] lg:w-25 lg:h-[calc(100vh-64px)] fixed md:mx-4 md:my-4 lg:mx-8 lg:my-8 md:rounded-lg lg:rounded-3xl p-4 md:px-6 lg:py-12 flex lg:flex-col justify-between lg:items-center">
      <div className="lg:space-y-20 flex justify-between w-full lg:flex-col lg:items-center">
        <Image
          src="/icon-logo.svg"
          alt="logo"
          width={32}
          height={25}
          priority
        />
        <ul className="flex lg:flex-col justify-center items-center lg:gap-y-10 gap-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <Image
                  src={link.icon}
                  alt={link.href}
                  width={20}
                  height={20}
                  className={clsx(
                    "w-4 md:w-5",
                    pathname === link.href && "brightness-400",
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>
        <div />
      </div>
      <IoIosLogOut
        className="text-primary-500 w-7 h-7"
        role="button"
        onClick={() => signOut({ callbackUrl: "/login" })}
      />
    </div>
  );
};

export default Navbar;
