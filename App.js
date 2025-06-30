import React, { useState, useEffect } from "react";

const fakeUsersKey = "canteenUsers";

function saveUsers(users) {
  localStorage.setItem(fakeUsersKey, JSON.stringify(users));
}

function getUsers() {
  return JSON.parse(localStorage.getItem(fakeUsersKey)) || [];
}

const canteenImageURL = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80";

// Menu Items with Prices
const menuItems = [
  { id: 1, name: "Samosa", available: true, prepTime: 5, price: 10 },
  { id: 2, name: "Chicken Roll", available: false, prepTime: 10, price: 40 },
  { id: 3, name: "Pasta", available: true, prepTime: 15, price: 50 },
  { id: 4, name: "Idli", available: true, prepTime: 7, price: 20 },
  { id: 5, name: "Lemon Rice", available: false, prepTime: 12, price: 30 },
  { id: 6, name: "Egg Curry", available: true, prepTime: 20, price: 45 },
  { id: 7, name: "Masala Dosa", available: true, prepTime: 10, price: 35 },
  { id: 8, name: "Veg Biryani", available: true, prepTime: 20, price: 60 },
  { id: 9, name: "Chapati with Curry", available: false, prepTime: 15, price: 25 },
  { id: 10, name: "Poori with Aloo", available: true, prepTime: 10, price: 30 },
  { id: 11, name: "Tea", available: true, prepTime: 3, price: 10 },
  { id: 12, name: "Coffee", available: true, prepTime: 4, price: 15 },
  { id: 13, name: "Paneer Butter Masala", available: false, prepTime: 18, price: 70 },
  { id: 14, name: "Fried Rice", available: true, prepTime: 12, price: 55 },
  { id: 15, name: "Mango Lassi", available: true, prepTime: 5, price: 25 },
];


// Home Component
function Home({ user, onLogout }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [refCode, setRefCode] = useState("");
  const [confirmation, setConfirmation] = useState("");

  function openBooking(item) {
    if (!item.available) return;
    setSelectedItem(item);
    setQuantity(1);
    setRefCode("");
    setConfirmation("");
  }

  function book() {
    if (quantity < 1) {
      alert("Quantity must be 1 or more");
      return;
    }
    let totalPrice = selectedItem.price * quantity;
    let message = `Order booked: ${quantity} x ${selectedItem.name}\nEstimated prep time: ${
      selectedItem.prepTime * quantity
    } mins\nTotal Price: ₹${totalPrice}`;
    if (refCode.trim()) {
      message += `\nReference code: ${refCode.trim()}`;
    }
    setConfirmation(message);
  }

  return (
    <div>
      <h2>
        Welcome, {user.name} ({user.role})
      </h2>
      <button onClick={onLogout} style={buttonStyle}>
        Logout
      </button>

      <h3>Menu</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 15 }}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => openBooking(item)}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              width: 140,
              cursor: item.available ? "pointer" : "not-allowed",
              opacity: item.available ? 1 : 0.5,
              userSelect: "none",
              backgroundColor: "#222",
              color: "#fff",
              textAlign: "center",
              boxShadow: item.available ? "0 0 5px 2px #4caf50" : "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              if (item.available) e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h4>{item.name}</h4>
            <p style={{ margin: 0 }}>₹{item.price}</p>
            <p
              style={{
                color: item.available ? "#4caf50" : "#f44336",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              {item.available ? "Available" : "Sold Out"}
            </p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            backgroundColor: "rgba(0,0,0,0.8)",
            borderRadius: 10,
          }}
        >
          <h3>Book: {selectedItem.name}</h3>
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ marginLeft: 10, width: 60, padding: 5 }}
            />
          </label>
          <br />
          <label>
            Reference Code (optional):
            <input
              type="text"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              placeholder="Enter code"
              style={{ marginLeft: 10, padding: 5, width: 150 }}
            />
          </label>
          <br />
          <button onClick={book} style={{ ...buttonStyle, marginTop: 10 }}>
            Confirm Booking
          </button>
          {confirmation && (
            <p
              style={{
                marginTop: 15,
                padding: 10,
                backgroundColor: "#4caf50",
                borderRadius: 5,
                color: "#fff",
              }}
            >
              {confirmation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Register Component
function Register({ onRegister, onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      alert("User with this email already exists");
      return;
    }
    onRegister({ name, email, password, role });
  }

  return (
    <div>
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={{ ...inputStyle, padding: "8px 6px" }}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <br />
        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>
      <p>
        Already have account?{" "}
        <button onClick={onGoToLogin} style={linkButtonStyle}>
          Login here
        </button>
      </p>
    </div>
  );
}

// Login Component
function Login({ onLogin, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setError("");
      onLogin(user);
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
      <p>
        New user?{" "}
        <button onClick={onGoToRegister} style={linkButtonStyle}>
          Register here
        </button>
      </p>
    </div>
  );
}

// App Component
function App() {
  const [page, setPage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("canteenSession"));
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setPage("home");
    }
  }, []);

  function handleLogin(user) {
    localStorage.setItem("canteenSession", JSON.stringify(user));
    setCurrentUser(user);
    setPage("home");
  }

  function handleLogout() {
    localStorage.removeItem("canteenSession");
    setCurrentUser(null);
    setPage("login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${canteenImageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: 12,
          padding: 30,
          boxShadow: "0 0 20px rgba(0,0,0,0.9)",
        }}
      >
        {page === "register" && (
          <Register
            onRegister={(user) => {
              const users = getUsers();
              users.push(user);
              saveUsers(users);
              alert("Registered successfully! Please login.");
              setPage("login");
            }}
            onGoToLogin={() => setPage("login")}
          />
        )}
        {page === "login" && (
          <Login
            onLogin={handleLogin}
            onGoToRegister={() => setPage("register")}
          />
        )}
        {page === "home" && currentUser && (
          <Home user={currentUser} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 8,
  margin: "8px 0",
  borderRadius: 5,
  border: "none",
  outline: "none",
};

const buttonStyle = {
  backgroundColor: "#4caf50",
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
  fontWeight: "bold",
};

const linkButtonStyle = {
  background: "none",
  border: "none",
  color: "#4caf50",
  cursor: "pointer",
  textDecoration: "underline",
  padding: 0,
  fontSize: "1em",
};

export default App;
