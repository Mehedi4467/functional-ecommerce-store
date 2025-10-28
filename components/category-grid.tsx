"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryGridProps {
  categories: string[];
}

const categoryImages: Record<string, string> = {
  electronics: "/electronics-components.png",
  jewelery: "/assorted-jewelry-display.png",
  "men's clothing": "/mens-clothing-display.png",
  "women's clothing": "/womens-clothing.png",
  "phone accessories": "/phone-ac.jpg",
  "sports and fitness": "/sports.jpg",
  watches: "/watch.jpg",
  "pets food": "/pet_foot.jpg",
  "home and kitchen": "/home.jpg",
};

const categoryLabels: Record<string, string> = {
  electronics: "Electronics",
  jewelery: "Jewelry",
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
  "phone accessories": "Phone Accessories",
  "sports and fitness": "Sports and Fitness",
  watches: "Watches",
  "pets food": "Pets Food",
  "home and kitchen": "Home and Kitchen",
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  const router = useRouter();

  const addCategories = [
    ...categories,
    "phone accessories",
    "sports and fitness",
    "watches",
    "pets food",
    "home and kitchen",
  ];

  const handleCategoryClick = (category: string) => {
    router.push(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold mb-8">Shop By Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 justify-between gap-4">
          {addCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="group cursor-pointer w-[100px] h-[100px]"
            >
              <div className="relative overflow-hidden  rounded-lg bg-gray-100 aspect-square mb-3 hover:shadow-lg transition-shadow">
                <Image
                  src={
                    categoryImages[category] ||
                    "/placeholder.svg?height=200&width=200&query=product"
                  }
                  alt={category}
                  fill
                  className="object-cover group-hover:scale-105 w-[100px] h-[100px] transition-transform duration-300"
                />
              </div>
              <p className="text-sm font-medium text-center text-foreground group-hover:text-primary transition">
                {categoryLabels[category] || category}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
