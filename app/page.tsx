import { getProducts, getTopProducts } from "@/lib/api";
import { Header } from "@/components/header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const products = await getProducts();
  const topProducts = getTopProducts(products, 8);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20 px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to ShopHub
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices. Shop from
              thousands of items across all categories.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-muted-foreground">
                  Top-rated items handpicked for you
                </p>
              </div>
              <Link
                href="/products"
                className="text-accent hover:underline font-semibold flex items-center gap-2"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted border-t py-12 px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4">About ShopHub</h3>
                <p className="text-sm text-muted-foreground">
                  Your trusted online shopping destination for quality products.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/products" className="hover:text-foreground">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="hover:text-foreground">
                      Cart
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 ShopHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
