import { useState } from "react";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../../hooks/useProducts";
import { toast } from "react-hot-toast";
import { ProductForm } from "../../components/products/ProductForm";
import { Modal } from "../../components/common";
import type { Product } from "../../types";

export default function AdminProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    data: productsData,
    isLoading,
    error,
  } = useProducts({
    page: 1,
    limit: 100,
  });
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const products = productsData?.items || [];

  const handleSubmit = async (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      if (selectedProduct) {
        await updateProduct.mutateAsync({ id: selectedProduct.id, ...data });
        toast.success("Product updated successfully!");
      } else {
        await createProduct.mutateAsync(data);
        toast.success("Product created successfully!");
      }
      setModalOpen(false);
      setSelectedProduct(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Loading products...
              </p>
            </div>
          </div>
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
              Failed to load products
            </h2>
            <p className="text-gray-600 mb-6">
              {error.message ||
                "Something went wrong while loading products. Please try again."}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {/* Hàng 2: Tiêu đề */}
            <h1 className="text-4xl md:text-4xl font-bold text-gray-900 mb-2">
              Store Manage
            </h1>

            {/* Hàng 3: Mô tả */}
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create, edit, and manage your product inventory with ease
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setModalOpen(true);
            }}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Product
          </button>
        </div>

        {/* Modern Products Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-amber-500">
                  <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-center text-sm font-bold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-6">
                        <img
                          src={
                            product.imageUrl ||
                            "https://via.placeholder.com/100"
                          }
                          alt={product.name}
                          className="w-20 h-20 rounded-2xl object-cover shadow-md"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-xl mb-1">
                            {product.name}
                          </p>
                          <p className="text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-2xl font-bold text-orange-600">
                        {product.price.toLocaleString()} VND
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setModalOpen(true);
                          }}
                          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold hover:shadow-md transition-all duration-300 flex items-center gap-2"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {deletingId === product.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Deleting...
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-8 py-16 text-center">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Click "Add Product" to create your first product
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedProduct ? "Edit Product" : "Add Product"}
      >
        <ProductForm
          product={selectedProduct}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isLoading={createProduct.isPending || updateProduct.isPending}
        />
      </Modal>
    </div>
  );
}
