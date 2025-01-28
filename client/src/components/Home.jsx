import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductCard, CartModal } from "./ProductCard";
import HeaderNavbar from "./HeaderNavbar";

const Home = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false); 
  const [successMessage, setSuccessMessage] = useState("");

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/e-commerce/getproducts");
      return response.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/e-commerce/getproducts/type/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category: ${category}`, error);
      throw error;
    }
  };

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = category ? await fetchProductsByCategory(category) : await fetchAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [category, loadProducts]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setSuccessMessage(`${product.name} added to cart!`);
      setTimeout(() => setSuccessMessage(""), 3000); 
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setSuccessMessage(`Product removed from cart.`);
      setTimeout(() => setSuccessMessage(""), 3000); 
      return updatedCart;
    });
  };

  const toggleCartVisibility = () => setIsCartVisible(!isCartVisible);

  return (
    <div style={{ padding: "1rem" }}>
  <HeaderNavbar
    cartLength={cart.length}
    cartItems={cart}
    removeFromCart={removeFromCart}
    isCategoriesVisible={isCategoriesVisible}
    setIsCategoriesVisible={setIsCategoriesVisible}
    toggleCartVisibility={toggleCartVisibility}
    isCartVisible={isCartVisible}
  />

  {/* Success Message Pop-up */}
  {successMessage && (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        textAlign: "center",
        borderRadius: "4px",
        marginBottom: "10px",
        position: "sticky",
        top: "0",  
        left: "0",
        right: "0",
        zIndex: 1000,
        width: "20%",
      }}
    >
      {successMessage}
    </div>
  )}

<div style={{ marginTop: "80px" }}>
  {loading ? (
    <p>Loading...</p>
  ) : products.length > 0 ? (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  ) : (
    <p>No products found for this category.</p>
  )}
</div>


  <CartModal
    isCartVisible={isCartVisible}
    cartItems={cart}
    removeFromCart={removeFromCart}
  />
</div>

  );
};

export default Home;
