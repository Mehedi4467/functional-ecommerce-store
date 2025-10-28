# E-Commerce Store

A modern, fully-featured e-commerce web application built with Next.js, React, and Tailwind CSS. This project provides a complete shopping experience with product browsing, search functionality, shopping cart management, and checkout simulation.

## Features

- **Product Catalog**: Browse products from FakeStore API with detailed information
- **Search & Filter**: Search products by name and filter by category, price range, and ratings
- **Shopping Cart**: Add/remove items, adjust quantities, and persistent cart storage using localStorage
- **Product Details**: View detailed product information with related products
- **Checkout Flow**: Multi-step checkout process with shipping, payment, and order review
- **Mobile Navigation**: Bottom navigation bar for seamless mobile experience
- **Dark/Light Mode**: Theme toggle with system preference detection and persistence
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Category Browse**: Shop by category with visual category cards
- **Quick Deals**: Carousel section featuring promotional products with discounts
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **UI Components**: shadcn/ui
- **API**: FakeStore API (https://fakestoreapi.com)
- **Icons**: Lucide React
- **Data Fetching**: SWR

## Color Scheme

- **Primary Color**: #ff872d (Orange)
- **Secondary Color**: #151515 (Dark Gray/Black)
- **Background**: White (Light Mode) / #151515 (Dark Mode)

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ecommerce-store
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application

## Project Structure

\`\`\`
ecommerce-store/
├── app/
│ ├── layout.tsx # Root layout with theme provider
│ ├── globals.css # Global styles and design tokens
│ ├── page.tsx # Homepage
│ ├── products/
│ │ ├── page.tsx # Products listing page
│ │ └── [id]/
│ │ └── page.tsx # Product details page
│ ├── cart/
│ │ └── page.tsx # Shopping cart page
│ ├── checkout/
│ │ └── page.tsx # Checkout flow page
│ └── search/
│ └── page.tsx # Search results page
├── components/
│ ├── header.tsx # Header with logo and search
│ ├── mobile-nav.tsx # Mobile bottom navigation
│ ├── product-card.tsx # Product card component
│ ├── search-bar.tsx # Search input component
│ ├── promo-banner.tsx # Promotional banner carousel
│ ├── quick-deals-carousel.tsx # Quick deals section
│ ├── category-grid.tsx # Category browse section
│ ├── theme-provider.tsx # Dark/light mode provider
│ └── ui/ # shadcn/ui components
├── lib/
│ ├── store.ts # Zustand store for cart state
│ ├── api.ts # API utility functions
│ └── utils.ts # Utility functions
├── public/
│ ├── logo.png # Brand logo
│ └── category-images/ # Category images
└── README.md # This file
\`\`\`

## Key Features Explained

### Shopping Cart

- Items are stored in localStorage for persistence
- Cart state is managed with Zustand
- Automatic calculation of subtotal, tax, and total

### Search & Filter

- Real-time search across product titles and descriptions
- Filter by category, price range, and ratings
- Sort by featured, price (low-to-high, high-to-low), and ratings

### Mobile Navigation

- Bottom navigation bar appears on mobile screens (< 768px)
- Floating action button for shop/catalog access
- Quick access to home, search, cart, and profile

### Dark Mode

- Automatic detection of system preference
- Manual toggle in header
- Persistent theme preference in localStorage

## Environment Variables

Currently, this project uses the public FakeStore API and doesn't require environment variables. If you plan to add backend features, you may need to add:

\`\`\`
NEXT_PUBLIC_API_URL=your_api_url
\`\`\`

## Available Scripts

\`\`\`bash

# Development server

npm run dev

# Build for production

npm run build

# Start production server

npm start

# Run linter

npm run lint
\`\`\`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- User authentication and accounts
- Real payment integration (Stripe)
- Order history and tracking
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard
- Inventory management
- Email notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and Tailwind CSS**
