// src/pages/ProductDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { ProductDetail } from "../components/products";
import { useProduct } from "../hooks";
import { useAddToCart } from "../hooks/useCart";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch product from API using React Query
  const { data: product, isLoading, error } = useProduct(id || "");
  const addToCart = useAddToCart();

  const handleAddToCart = async (
    productId: string,
    quantity: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _size?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _color?: string
  ) => {
    try {
      await addToCart.mutateAsync({ productId, quantity });
      // Success feedback is handled by React Query's onSuccess callback

      // Optionally redirect to cart after adding
      // navigate('/cart')
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen relative relative overflow-hidden">
        {" "}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Loading product...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen relative relative overflow-hidden">
        {" "}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 text-center">
              <div className="text-6xl mb-4">😕</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                Product Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                {error
                  ? "Failed to load product details."
                  : "The product you're looking for doesn't exist."}
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transform transition-all duration-300"
              >
                ← Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative relative overflow-hidden">
      {" "}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-8 text-base text-gray-600 flex items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="hover:text-orange-600 transition-colors font-semibold flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-orange-600 transition-colors font-semibold flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Products
          </button>
          <span>/</span>
          <span className="text-gray-800 font-bold flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            {product.name}
          </span>
        </nav>

        {/* Product Detail Component */}
        <ProductDetail product={product} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}
