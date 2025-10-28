"use client";

import { type Product, useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface QuickDealCardProps {
  product: Product;
}

export function QuickDealCard({ product }: QuickDealCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const discountPercent = Math.floor(Math.random() * 40) + 20;

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col border border-gray-100">
        {/* Image container with discount badge */}
        <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-contain p-3 hover:scale-105 transition-transform"
          />

          <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm shadow-lg">
            <div className="text-center">
              <div className="text-xs font-semibold">-{discountPercent}%</div>
              <div className="text-xs">OFF</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-semibold  text-sm line-clamp-2 mb-2 hover:text-blue-600">
            {product.title ? product?.title?.slice(0, 18) + ".." : ""}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{product.rating.rate}</span>
            <span className="text-xs text-gray-500">
              ({product.rating.count})
            </span>
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-blue-600">
                ${(product.price * 0.6).toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Stock info */}
          <div className="text-xs text-green-600 font-semibold mb-3">
            {Math.floor(Math.random() * 10) + 1} In Stock
          </div>

          {/* Add to cart button */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={isAdding}
            className="w-full gap-2 cursor-pointer text-xs py-1 h-auto"
            variant="default"
          >
            <ShoppingCart className="w-3 h-3" />
            {isAdding ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
