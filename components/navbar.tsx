"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase"; // Import Supabase client
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Check authentication status on page load
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    checkUser();

    // Listen for auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="border-b fixed top-0 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <Wand2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WebGenie</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {["Features", "Examples", "Pricing", "About"].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className="relative text-lg font-medium transition-colors hover:text-primary before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-primary before:transition-all before:duration-300 hover:before:w-full"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <ThemeToggle />
          {user ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-2 border rounded-md text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-all"
              onClick={handleLogout}
            >
              Logout
            </motion.button>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Button asChild variant="outline">
                  <Link href="/auth/login">Login</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Button asChild>
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle /> {/* Move ThemeToggle here */}
          <button
            className="flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("container md:hidden", isMenuOpen ? "block pb-4" : "hidden")}>
        <div className="flex flex-col items-center space-y-3"> {/* Center align links */}
          {["Features", "Examples", "Pricing", "About"].map((item) => (
            <motion.div key={item} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="relative text-sm font-medium transition-colors hover:text-primary before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-primary before:transition-all before:duration-300 hover:before:w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            </motion.div>
          ))}
          <div className="flex items-center gap-2 pt-2">
            {user ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="w-full px-4 py-2 border rounded-md text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-all"
                onClick={handleLogout}
              >
                Logout
              </motion.button>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} className="w-full">
                  <Button asChild variant="outline">
                    <Link href="/auth/login">Login</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} className="w-full">
                  <Button asChild>
                    <Link href="/auth/sign-up">Sign Up</Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}