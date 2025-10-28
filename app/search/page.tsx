import { getProducts, getProductsByCategory } from "@/lib/api";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";
  const categoryFilter = params.category || "";
  let products = await getProducts();
  if (categoryFilter) {
    products = await getProductsByCategory(categoryFilter);
  }
  if (query) {
    products = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-8 px-4">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {categoryFilter
                  ? `${
                      categoryFilter.charAt(0).toUpperCase() +
                      categoryFilter.slice(1)
                    }`
                  : "Search Results"}
              </h1>
              {query && (
                <p className="text-muted-foreground">Results for "{query}"</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                Found {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found
                </p>
                <Link
                  href="/products"
                  className="text-primary hover:underline font-medium"
                >
                  Browse all products
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
