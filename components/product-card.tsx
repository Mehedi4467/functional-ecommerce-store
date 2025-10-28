"use client"

import { type Product, useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)
    // Reset after animation
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 bg-muted overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      <CardContent className="flex-1 pt-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-accent transition mb-2">{product.title}</h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{product.rating.rate}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.rating.count})</span>
        </div>

        <p className="text-2xl font-bold text-accent">${product.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter>
        <Button onClick={handleAddToCart} disabled={isAdding} className="w-full gap-2" variant="default">
          <ShoppingCart className="w-4 h-4" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
