import logo from "../../assets/logo.png";
import ProductCard from "../ProductCard";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import AppContext from "../../Context/AppContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  // Selected range values (controlled by dual sliders)
  const [minSelected, setMinSelected] = useState(0);
  const [maxSelected, setMaxSelected] = useState(0);
  const { cartItems: _cartItems, setCartItems } = useContext(AppContext);

  const addToCart = useCallback(
    (product) => {
      setCartItems((prev) => {
        // If already exists, increment quantity; else add with quantity 1
        const idx = prev.findIndex((p) => p.id === product.id);
        let next;
        if (idx !== -1) {
          next = prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        } else {
          next = [...prev, { ...product, quantity: 1 }];
        }

        try {
          localStorage.setItem("cartItems", JSON.stringify(next));
        } catch {
          // ignore storage errors
        }
        return next;
      });
    },
    [setCartItems]
  );

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setProducts(data);
        setError("");
        // compute price range
        if (Array.isArray(data) && data.length) {
          const prices = data.map((p) => Number(p.price) || 0);
          const lo = Math.floor(Math.min(...prices));
          const hi = Math.ceil(Math.max(...prices));
          setMinPrice(lo);
          setMaxPrice(hi);
          setMinSelected(lo);
          setMaxSelected(hi);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to load products. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  // Fetch categories and include 'All'
  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products/categories",
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error("categories");
        const list = await res.json();
        setCategories(["All", ...list]);
      } catch {
        // derive from products as fallback
        const set = Array.from(new Set(products.map((p) => p.category)));
        setCategories(["All", ...set]);
      }
    };
    run();
    return () => controller.abort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const price = Number(p.price) || 0;
      const matchesPrice = price >= minSelected && price <= maxSelected;
      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesPrice && matchesCat;
    });
  }, [products, minSelected, maxSelected, selectedCategory]);

  return (
    <div className="flex flex-col gap-8 p-4 justify-center items-center">
      {/* Logo place */}
      <div className="p-3 flex justify-center items-center gap-2">
        <div className="h-1 w-8 rounded-full bg-gray-400"></div>
        <img src={logo} className="w-30" alt="" />
        <div className="h-1 w-8 rounded-full bg-gray-400"></div>
      </div> 

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center uppercase text-[#363738]">
        Featured Products
      </h1>
      <p className="max-w-[800px] w-full text-center text-gray-600">
        Discover a smarter way to shop with ShopEase — your all-in-one
        destination for effortless online shopping. Browse through a curated
        selection of top-quality products, enjoy a smooth checkout experience,
        and get everything you love delivered right to your doorstep. Shopping
        made simple, fast, and reliable.
      </p>

      {/* Categories bar */}
      <div className="w-full border-t border-b py-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12 uppercase tracking-wide text-base md:text-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                "px-2 md:px-3 py-1 transition-colors" +
                (selectedCategory === cat
                  ? " text-gray-900 font-extrabold border-b-2 border-amber-400"
                  : " text-gray-400 hover:text-gray-600")
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range filter (dual thumb) */}
      <div className="w-full max-w-5xl px-4">
        <div className="flex items-center gap-4">
          <span className="text-sm md:text-base text-gray-600 shrink-0">
            Price:
          </span>
          <div className="flex-1">
            <div className="relative h-8 flex items-center pretty-range">
              {/* Min slider */}
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={1}
                value={minSelected}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), maxSelected);
                  setMinSelected(val);
                }}
                className="absolute inset-0 w-full pointer-events-auto"
              />
              {/* Max slider */}
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={1}
                value={maxSelected}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), minSelected);
                  setMaxSelected(val);
                }}
                className="absolute inset-0 w-full pointer-events-auto"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 items-center text-xs md:text-sm text-gray-600">
              <span className="justify-self-start">$ {minPrice}</span>
              <div className="justify-self-center flex items-center gap-2">
                <span className="value-badge">$ {minSelected}</span>
                <span className="text-gray-400">to</span>
                <span className="value-badge">$ {maxSelected}</span>
              </div>
              <span className="justify-self-end">$ {maxPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <div className="py-10 text-gray-500">Loading products…</div>}
      {error && !loading && <div className="py-10 text-red-600">{error}</div>}

      {/* Products */}
      {!loading && !error && (
        <div className="flex gap-5 flex-wrap justify-center items-center">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              discount={25}
              rating={product.rating?.rate ?? 0}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
