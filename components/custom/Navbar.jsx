"use client";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const pages = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Pricing", href: "/pricing" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const pathname = usePathname(); // Get current page path

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      {/* Logo (Always on the Left) */}
      <span className="text-2xl font-bold">WebGenie</span>

      {isDesktop ? (
        /* Desktop Navigation Links */
        <ul className="flex space-x-4">
          {pages.map(({ title, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-lg transition-all duration-300 
                  ${pathname === href ? "bg-blue-600 text-white font-semibold" : "text-gray-700"} 
                  hover:bg-blue-500 hover:text-white`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        /* Mobile Menu Icon (Always on the Right) */
        <Drawer>
          <DrawerTrigger>
            <MenuIcon className="h-6 w-6" />
          </DrawerTrigger>

          {/* Drawer Content */}
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>

            {/* Navigation Links */}
            <nav className="p-4 flex flex-col space-y-2">
              {pages.map(({ title, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 
                    ${pathname === href ? "bg-blue-600 text-white font-semibold" : "text-gray-700"} 
                    hover:bg-blue-500 hover:text-white`}
                >
                  {title}
                </Link>
              ))}
            </nav>
          </DrawerContent>
        </Drawer>
      )}
    </nav>
  );
}
