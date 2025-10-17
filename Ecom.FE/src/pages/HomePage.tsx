// src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import { Button } from "../components/common";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      {/* Hero Section with Image Banner */}
      <div className="relative h-[600px] md:h-[700px] overflow-hidden z-10">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Shopping"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl ml-5">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight animate-fade-in-up animation-delay-200">
              Elevate Your
              <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Lifestyle Today
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl animate-fade-in-up animation-delay-400">
              Transform your wardrobe with{" "}
              <span className="font-bold text-amber-400">
                curated collections
              </span>{" "}
              and express delivery worldwide 🌍
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
              <Link to="/products">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 px-10 py-5 text-lg font-semibold"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shopping Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              {user ? (
                <Link to="/orders">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-orange-600 backdrop-blur-sm px-10 py-5 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    View Orders
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-orange-600 backdrop-blur-sm px-10 py-5 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Join Free Today
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Categories Quick Access */}
      <div className="relative -mt-20 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Fashion",
                icon: "👔",
                color: "from-pink-500 to-rose-500",
                hoverColor: "hover:shadow-pink-500/25",
              },
              {
                name: "Electronics",
                icon: "📱",
                color: "from-blue-500 to-indigo-500",
                hoverColor: "hover:shadow-blue-500/25",
              },
              {
                name: "Home & Living",
                icon: "🏠",
                color: "from-green-500 to-emerald-500",
                hoverColor: "hover:shadow-green-500/25",
              },
              {
                name: "Beauty",
                icon: "💄",
                color: "from-purple-500 to-pink-500",
                hoverColor: "hover:shadow-purple-500/25",
              },
            ].map((category) => (
              <Link
                key={category.name}
                to="/products"
                className={`group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl ${category.hoverColor} hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-white/20`}
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mx-auto shadow-lg`}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                </div>
                <h3 className="text-center font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 text-lg">
                  {category.name}
                </h3>
                <p className="text-center text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Collection
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            What Makes Us Different?
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            We're not just another online store - we're your personal style
            companion
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Main Feature */}
          <div className="flex relative group justify-center items-center">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-10 text-white shadow-2xl transform group-hover:scale-105 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-20 h-40 bg-white/20 rounded-2xl flex items-center justify-center mr-6">
                  <span className="text-4xl">🎨</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">Personal Styling</h3>
                  <p className="text-orange-100 text-lg">
                    AI-Powered Recommendations
                  </p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-orange-50">
                Our advanced AI analyzes your preferences and suggests the
                perfect pieces that match your unique style. Get personalized
                recommendations that evolve with your taste.
              </p>
              <div className="mt-8 flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <p className="font-semibold">Smart Matching</p>
                  <p className="text-orange-100 text-sm">
                    Find your perfect fit every time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Two Features */}
          <div className="space-y-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-3xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    Lightning Fast Delivery
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Same-day delivery in major cities. Track your package in
                    real-time with our advanced logistics system.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <span className="mr-2">⚡</span>
                    <span>2-4 hours delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-3xl">🌱</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    Sustainable Fashion
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Every purchase supports eco-friendly practices. We partner
                    with sustainable brands committed to environmental
                    responsibility.
                  </p>
                  <div className="flex items-center text-green-600 font-semibold">
                    <span className="mr-2">♻️</span>
                    <span>100% Carbon Neutral</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trusted by Fashion Enthusiasts Worldwide
          </h2>
          <p className="text-gray-600 text-lg">
            Join our community of style-conscious shoppers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                S
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                <p className="text-gray-500 text-sm">Fashion Blogger</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The AI recommendations are spot-on! I've never been more
              confident in my style choices. Every piece fits perfectly and
              matches my aesthetic."
            </p>
            <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                M
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Mike Chen</h4>
                <p className="text-gray-500 text-sm">Tech Professional</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Lightning-fast delivery and sustainable options? This is exactly
              what I was looking for. The quality is outstanding and I feel good
              about my purchases."
            </p>
            <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                E
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Emma Rodriguez</h4>
                <p className="text-gray-500 text-sm">Sustainability Advocate</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Finally, a fashion platform that aligns with my values! The
              carbon-neutral shipping and sustainable brands make me feel great
              about every purchase."
            </p>
            <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                150K+
              </div>
              <div className="text-gray-300">Style Enthusiasts</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                25K+
              </div>
              <div className="text-gray-300">Curated Items</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-gray-300">Style Match Rate</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                2hrs
              </div>
              <div className="text-gray-300">Avg. Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
