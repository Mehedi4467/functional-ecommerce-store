"use client"

import { useState, useEffect } from "react"
import { getProductById, getProducts } from "@/lib/api"
import { Header } from "@/components/header"
import { useCartStore, type Product } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Star, Minus, Plus } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      const productData = await getProductById(productId)
      setProduct(productData)

      if (productData) {
        // Load related products from same category
        const allProducts = await getProducts()
        const related = allProducts.filter((p) => p.category === productData.category && p.id !== productId).slice(0, 4)
        setRelatedProducts(related)
      }

      setLoading(false)
    }

    loadProduct()
  }, [productId])

  const handleAddToCart = async () => {
    if (!product) return

    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }

    // Reset after animation
    setTimeout(() => {
      setIsAdding(false)
      setQuantity(1)
    }, 500)
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Loading product...</p>
        </main>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <Link href="/products" className="flex items-center gap-2 text-accent hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Product not found</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Back Button */}
          <Link href="/products" className="flex items-center gap-2 text-accent hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Image */}
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center min-h-96">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="max-w-full max-h-96 object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground capitalize">{product.category}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(product.rating.rate)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{product.rating.rate}</span>
                  </div>
                  <span className="text-muted-foreground">({product.rating.count} reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-accent">${product.price.toFixed(2)}</p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-muted transition"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-muted transition">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">In Stock</span>
                </div>

                <Button onClick={handleAddToCart} disabled={isAdding} size="lg" className="w-full gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {isAdding ? "Adding to Cart..." : "Add to Cart"}
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="relative w-full h-48 bg-muted overflow-hidden">
                        <img
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.title}
                          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold line-clamp-2 mb-2">{relatedProduct.title}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-accent">${relatedProduct.price.toFixed(2)}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{relatedProduct.rating.rate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
