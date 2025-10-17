// src/pages/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Trang đích trước khi bị chặn
  const from = (location.state as any)?.from?.pathname || "/products";

  // Get success message from registration if any
  const successMessage = (location.state as any)?.message;
  const messageType = (location.state as any)?.type;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(
        err?.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // nhẹ nhàng: nếu bạn có toast thì gọi toast.success('Copied') ở đây
    } catch {}
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden relative flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Container với layout mới */}
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block mb-4"></div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-3">
            Welcome Back!
          </h1>
          <p className="text-gray-700 text-lg">
            Sign in to your account to continue
          </p>
        </div>

        {/* Layout dọc: Login form trên, Demo credentials dưới */}
        <div className="space-y-6">
          {/* Login Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-5">
              {successMessage && messageType === "success" && (
                <div className="bg-green-50/90 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-2xl">
                  <p className="text-sm">✅ {successMessage}</p>
                </div>
              )}
              {error && (
                <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                  <p className="text-sm">⚠️ {error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                />
              </div>

              <div className="text-right">
                {/* <Link
                  to="/forgot-password"
                  className="text-sm text-orange-600 hover:text-amber-600 font-medium transition-colors duration-300"
                >
                  Forgot password?
                </Link> */}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/70 backdrop-blur-sm text-gray-600 font-medium rounded-full">
                    Or
                  </span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-700">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-orange-600 hover:text-amber-600 font-semibold transition-colors duration-300"
                  >
                    Sign up for free →
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Demo Credentials Card (dưới Login Card) */}
          <div className="bg-gradient-to-br from-orange-500/90 to-amber-500/90 text-white rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="text-center mb-4">
              <p className="text-sm text-orange-50">
                Đây là tài khoản Adminđể thử nghiệm
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
                <div className="text-sm">
                  <div className="text-orange-100/90 text-xs">Email</div>
                  <div className="font-semibold">admin123@gmail.com</div>
                </div>
                <button
                  onClick={() => copy("admin@test.com")}
                  className="px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 transition text-xs"
                  type="button"
                >
                  Copy
                </button>
              </div>

              <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
                <div className="text-sm">
                  <div className="text-orange-100/90 text-xs">Password</div>
                  <div className="font-semibold">123456</div>
                </div>
                <button
                  onClick={() => copy("123456")}
                  className="px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 transition text-xs"
                  type="button"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Auto-fill button */}
            <button
              type="button"
              onClick={() =>
                setFormData({ email: "admin@test.com", password: "123456" })
              }
              className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition"
            >
              Điền sẵn thông tin & dùng thử
            </button>
            <p className="text-xs text-orange-50 mt-2 text-center">
              * Bấm để tự động điền vào form phía trên, sau đó nhấn "Sign In".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
