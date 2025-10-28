"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ShoppingBag, ShoppingCart, User } from "lucide-react"
import { useCartStore } from "@/lib/store"

export function MobileNav() {
  const pathname = usePathname()
  const totalItems = useCartStore((state) => state.getTotalItems())

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border">
      <div className="flex items-center justify-around h-20 px-4">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition ${
            isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>

        {/* Search */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition ${
            isActive("/products") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Search className="w-6 h-6" />
          <span className="text-xs font-medium">Search</span>
        </Link>

        {/* Central FAB - Shop */}
        <Link
          href="/products"
          className="flex flex-col items-center justify-center -mt-8 mb-2 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition transform hover:scale-110"
        >
          <ShoppingBag className="w-7 h-7" />
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition relative ${
            isActive("/cart") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="text-xs font-medium">Cart</span>
        </Link>

        {/* Profile */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition ${
            isActive("/profile") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  )
}
