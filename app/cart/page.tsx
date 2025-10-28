"use client"

import { Header } from "@/components/header"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  const totalPrice = getTotalPrice()
  const subtotal = totalPrice
  const tax = subtotal * 0.1 // 10% tax
  const shipping = items.length > 0 ? 10 : 0
  const total = subtotal + tax + shipping

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
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
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.product.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.title}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.product.id}`}>
                            <h3 className="font-semibold line-clamp-2 hover:text-accent transition mb-2">
                              {item.product.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-4 capitalize">{item.product.category}</p>
                          <p className="text-lg font-bold text-accent">${item.product.price.toFixed(2)}</p>
                        </div>

                        {/* Quantity and Remove */}
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>

                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-2 hover:bg-muted transition"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-2 font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 hover:bg-muted transition"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Link href="/products" className="inline-flex items-center gap-2 text-accent hover:underline mt-8">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-accent">${total.toFixed(2)}</span>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Button onClick={clearCart} variant="outline" size="sm" className="w-full bg-transparent">
                    Clear Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
