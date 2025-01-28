import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="product-image" 
        style={{
          width: "100%",
          height: "auto",  
          objectFit: "contain",  
          borderRadius: "8px",
          marginBottom: "1rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease", 
        }}
      />
      <h3>{product.name}</h3>
      <p style={{ fontStyle: "italic", color: "#555" }}>{product.company}</p>
      <p style={{ fontWeight: "bold", color: "#777" }}>{product.model}</p>
      <p style={{ fontSize: "1.2rem", color: "#333" }}>{product.price}</p>
      <p style={{  fontSize: "1rem" }}>{product.category}</p>

      <button
        onClick={() => addToCart(product)}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};


const CartModal = ({ isCartVisible, cartItems, removeFromCart }) => {
  return (
    isCartVisible && (
      <div
        style={{
          position: "fixed", 
          top: "80px", 
          right: "10px",
          width: "300px",
          padding: "1rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1001,
          overflowY: "auto", 
        }}
      >
        <h3>Your Cart</h3>
        {cartItems.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginRight: "10px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <strong>{item.name}</strong> - {item.price}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: "0.2rem 0.5rem",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                    marginLeft: "10px",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    )
  );
};

export { ProductCard, CartModal };
