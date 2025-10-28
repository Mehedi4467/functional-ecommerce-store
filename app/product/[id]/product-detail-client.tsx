"use client"

import { type Product, useCartStore } from "@/lib/store"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, ArrowLeft } from "lucide-react"
import { useState } from "react"

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="flex items-center gap-2 text-accent hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg p-8">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={400}
              height={400}
              className="object-contain max-w-full max-h-96"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating.rate) ? "fill-accent text-accent" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{product.rating.rate}</span>
              <span className="text-muted-foreground">({product.rating.count} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-accent">${product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border rounded-lg hover:bg-muted transition"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border rounded-lg hover:bg-muted transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition mb-4 ${
                isAdded ? "bg-green-600 text-white" : "bg-accent text-accent-foreground hover:opacity-90"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {isAdded ? "Added to Cart!" : "Add to Cart"}
            </button>

            <Link
              href="/cart"
              className="text-center px-6 py-3 border rounded-lg font-semibold hover:bg-muted transition"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
