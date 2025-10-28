import type { Product } from "./store";

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    return response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    return response.json();
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return [];
  }
}

// Utility function to find top 10 products by rating and price
export function getTopProducts(products: Product[], limit = 10): Product[] {
  return products
    .sort((a, b) => {
      const ratingDiff = b.rating.rate - a.rating.rate;
      if (ratingDiff !== 0) return ratingDiff;
      return a.price - b.price;
    })
    .slice(0, limit);
}
