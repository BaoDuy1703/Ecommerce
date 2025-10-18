// src/pages/CartPage.tsx
import { Link } from "react-router-dom";
import {
  useCart,
  useUpdateCartItem,
  useRemoveFromCart,
  useClearCart,
} from "../hooks/useCart";
import { useCreateOrder } from "../hooks/useOrders";
import { useCreatePayment } from "../hooks/usePayments";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function CartPage() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // React Query hooks
  const { data: cart, isLoading, error } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();
  const createOrder = useCreateOrder();
  const createPayment = useCreatePayment();

  const handleUpdateQuantity = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItem.mutateAsync({ productId, quantity: newQuantity });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("Failed to update quantity. Please try again.");
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!confirm("Are you sure you want to remove this item?")) return;

    try {
      await removeFromCart.mutateAsync(productId);
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Are you sure you want to clear your cart?")) return;

    try {
      await clearCart.mutateAsync();
    } catch (error) {
      console.error("Failed to clear cart:", error);
      alert("Failed to clear cart. Please try again.");
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Step 1: Create order with items from cart
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const order = await createOrder.mutateAsync({ items: orderItems });

      // Step 2: Create payment session for the order
      const { checkoutUrl } = await createPayment.mutateAsync({
        orderId: order.id,
        provider: "stripe",
      });

      // Step 3: Redirect to Stripe checkout
      window.location.href = checkoutUrl;
    } catch (error: any) {
      setIsCheckingOut(false);
      toast.error(
        error?.response?.data?.message || "Failed to proceed to checkout"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        {" "}
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">
            Loading your cart... 🛒
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Failed to load cart
            </h2>
            <p className="text-gray-600 mb-6">
              {error.message ||
                "Something went wrong while loading your cart. Please try again."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const cartItems = cart?.items || [];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4">
        {" "}
        <div className="text-center bg-white/70 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20 max-w-md">
          <svg
            className="mx-auto h-24 w-24 text-orange-400 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
            Shopping cart is empty
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Add some amazing products to get started!
          </p>
          <Link to="/products">
            <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const calculateTax = () => {
    return (cart?.totalAmount || 0) * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return (cart?.totalAmount || 0) + calculateTax();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Modern Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            {/* Hàng 1: Icon */}
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            {/* Hàng 2: Tiêu đề */}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>

            {/* Hàng 3: Mô tả */}
            <p className="text-gray-600">Review and checkout your items</p>
          </div>

          {/* Clear Cart Button - Separate row */}
          {cartItems.length > 0 && (
            <div className="flex justify-center mb-4">
              <button
                onClick={handleClearCart}
                disabled={clearCart.isPending}
                className="px-4 py-2 border bg-red-500 border-red-200 text-white hover:bg-red-600 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear Cart
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/200"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://via.placeholder.com/200?text=No+Image";
                      }}
                    />

                    {/* Product Info */}
                    <div className="flex-grow">
                      <Link
                        to={`/products/${item.productId}`}
                        className="text-xl font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>

                      <div className="mt-2">
                        <p className="text-2xl font-bold text-orange-600">
                          {item.price.toLocaleString()} VND
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        disabled={removeFromCart.isPending}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50 hover:bg-red-50 p-2 rounded-lg transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>

                      <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          disabled={
                            updateCartItem.isPending || item.quantity <= 1
                          }
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 font-bold text-gray-600 transition-all duration-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-lg text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                          disabled={updateCartItem.isPending}
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-gray-600 transition-all duration-300"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xl font-bold text-gray-900 mt-3">
                        {item.lineTotal.toLocaleString()} VND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-20">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-bold">
                      {(cart?.totalAmount || 0).toLocaleString()} VND
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Tax (10%)</span>
                    <span className="font-bold">
                      {calculateTax().toLocaleString()} VND
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                      <span className="font-medium">Shipping</span>
                    </div>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      {calculateTotal().toLocaleString()} VND
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-3"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Proceed to Checkout
                    </>
                  )}
                </button>

                <Link to="/products">
                  <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
