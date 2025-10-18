// src/components/products/ProductCard.tsx
import { Link } from "react-router-dom";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div className="group relative bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-primary-100/50 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-accent-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>

        {/* Product Image */}
        <div className="relative h-60 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={
              product.imageUrl ||
              "https://via.placeholder.com/400x400?text=No+Image"
            }
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/400x400?text=No+Image";
            }}
          />
        </div>

        {/* Product Info - 4 Rows Layout */}
        <div className="p-5 flex flex-col flex-grow relative z-20 space-y-3">
          {/* Row 1: Product Name */}
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg font-bold text-gray-800 mb-[-7px] group-hover:text-orange-600 transition-colors duration-300">
              {product.name}
            </h3>
          </div>

          {/* Row 2: Description */}
          <div>
            <p className="text-sm flex justify-center text-gray-600">
              {product.description}
            </p>
          </div>

          {/* Row 3: Price */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-bold text-green-600">
              {product.price.toLocaleString()} VND
            </span>
          </div>

          {/* Row 4: Add Button */}
          <div className="mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
