import { getProducts, getTopProducts } from "@/lib/api";
import { Header } from "@/components/header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PromoBanner } from "@/components/promo-banner";
import { QuickDealsCarousel } from "@/components/quick-deals-carousel";

export default async function Home() {
  const products = await getProducts();
  const topProducts = getTopProducts(products, 8);
  const quickDealProducts = products
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-8 px-4">
          <div className="mx-auto max-w-7xl">
            <PromoBanner />
          </div>
        </section>

        {/* Quick Deals Carousel */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <QuickDealsCarousel products={quickDealProducts} />
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
