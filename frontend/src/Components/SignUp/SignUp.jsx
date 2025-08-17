import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import './index.css';

const Signup = () => {
  const { signupUser, error } = useGlobalContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    whatsappNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signupUser(form);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up to WalletFlow</h2>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="WhatsApp Number (e.g., 9876543210)"
        value={form.whatsappNumber}
        onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
      
      />

      <button type="submit" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      {error && <p className="error">{error}</p>}

      <p className="redirect-text">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </form>
  );
};

export default Signup;
