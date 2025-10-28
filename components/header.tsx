"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { ShoppingCart, Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { SearchBar } from "./search-bar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="E-Commerce Logo"
                width={70}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="E-Commerce Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <SearchBar />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm hover:text-primary transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm hover:text-primary transition font-medium"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-sm hover:text-primary transition font-medium"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {totalItems || 0}
              </span>
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <SearchBar />
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm hover:text-primary transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm hover:text-primary transition font-medium"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-sm hover:text-primary transition font-medium"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({totalItems})
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
