import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart , faSignOut } from "@fortawesome/free-solid-svg-icons";
import '../App.css';

const HeaderNavbar = ({
  cartLength,
  // isCategoriesVisible,
  // setIsCategoriesVisible,
  toggleCartVisibility,
  // isCartVisible,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [username, setUsername] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username"); 
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      setUsername("");
    } else {
      navigate("/login");
    }
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 50);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => setDropdownVisible(!isDropdownVisible)}
          className="dropdown-btn"
        >
          ☰
        </button>
        <h1 style={{ margin: 0, fontSize: "20px", color: "#FF9900" }}>
          My E-commerce App
        </h1>
      </div>

      {isDropdownVisible && (
        <>
          <div className={`dropdown-menu ${isDropdownVisible ? "open" : ""}`}>
            <button
              onClick={() => setDropdownVisible(false)}
              className="close-btn"
            >
              ✖
            </button>
            <ul>
              <li><NavLink to="/">All</NavLink></li>
              <li><NavLink to="/category/airConditioner">Air Conditioner</NavLink></li>
              <li><NavLink to="/category/Computer">Computer</NavLink></li>
              <li><NavLink to="/category/Refrigerator">Refrigerator</NavLink></li>
              <li><NavLink to="/category/Furniture">Furniture</NavLink></li>
              <li><NavLink to="/category/Kitchen">Kitchen</NavLink></li>
              <li><NavLink to="/category/Menswear">Menswear</NavLink></li>
              <li><NavLink to="/category/Womenswear">Womenswear</NavLink></li>
              <li><NavLink to="/category/Mobile">Mobile</NavLink></li>
            </ul>
          </div>
          <div
            onClick={() => setDropdownVisible(false)}
            className="dropdown-backdrop"
          ></div>
        </>
      )}

      <div style={{ flex: 1, marginLeft: "20px", marginRight: "20px" }}>
        <input
          type="text"
          placeholder="Search for products..."
          className="search-input"
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {isLoggedIn ? (
          <span>{username}</span>
        ) : (
          <button onClick={handleLoginLogout}>
            <FontAwesomeIcon icon={faSignOut} /> Logout
          </button>
        )}
        {isLoggedIn && (
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleLoginLogout}
          >
            Logout
          </button>
        )}
        <button onClick={toggleCartVisibility} className="cart-btn">
        <FontAwesomeIcon icon={faShoppingCart} />Cart ({cartLength})
        </button>
      </div>
    </header>
  );
};

export default HeaderNavbar;
