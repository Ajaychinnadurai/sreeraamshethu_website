import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const emptyReg = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  password2: "",
};

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState(initialMode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [reg, setReg] = useState(emptyReg);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setError("");
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const setRegField = (k) => (e) => setReg((f) => ({ ...f, [k]: e.target.value }));

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) return setError("Please enter your username or email.");
    if (!password) return setError("Please enter your password.");

    setSubmitting(true);
    try {
      const u = await login(username, password);
      onClose();
      navigate(u.role === "ADMIN" || u.is_staff ? "/admin/" : "/client/");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!reg.first_name.trim() || !reg.last_name.trim()) return setError("Please enter your full name.");
    if (!reg.username.trim()) return setError("Please choose a username.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(reg.email)) return setError("Please enter a valid email address.");
    if (reg.password.length < 8) return setError("Password must be at least 8 characters.");
    if (reg.password !== reg.password2) return setError("Passwords do not match.");

    setSubmitting(true);
    try {
      const u = await register(reg);
      onClose();
      navigate(u.role === "ADMIN" || u.is_staff ? "/admin/" : "/client/");
    } catch (err) {
      const msg = err.response?.data;
      if (msg?.username) setError("That username is already taken.");
      else if (msg?.email) setError("That email is already registered.");
      else if (msg?.password) setError(String(msg.password[0]));
      else setError("Could not create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="auth-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="auth-modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="auth-modal-close" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>

            <div className="auth-modal-head" style={{ textAlign: "center" }}>
              <img
                src="/logo.png"
                alt="Sree Raam Shethu Logo"
                style={{ height: "3.2rem", width: "auto", margin: "0 auto 0.8rem", display: "block", borderRadius: "8px" }}
              />
              <h2 className="auth-modal-title">
                {mode === "login" ? "Welcome back" : "Create an account"}
              </h2>
              <p className="auth-modal-subtitle">
                {mode === "login" ? "Please enter your details" : "Fill in your information to get started"}
              </p>
            </div>

            {mode === "login" ? (
              <form onSubmit={handleLoginSubmit} className="auth-modal-body">
                <div className="field">
                  <label htmlFor="modal_username">Username or Email</label>
                  <div className={`input-field-wrap ${error ? "has-error" : ""}`}>
                    <input
                      id="modal_username"
                      className="focus-ring"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => { setError(""); setUsername(e.target.value); }}
                      placeholder="Enter your username"
                    />
                    {error && <AlertCircle size={18} className="input-err-icon" />}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="modal_password">Password</label>
                  <div className={`input-field-wrap ${error ? "has-error" : ""}`}>
                    <input
                      id="modal_password"
                      type="password"
                      className="focus-ring"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => { setError(""); setPassword(e.target.value); }}
                      placeholder="••••••••••••"
                    />
                    {error && <AlertCircle size={18} className="input-err-icon" />}
                  </div>
                  {error && <div className="input-err-msg">{error}</div>}
                </div>

                <div className="auth-modal-options">
                  <label className="auth-modal-checkbox">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <span>Remember for 30 days</span>
                  </label>
                  <button
                    type="button"
                    className="auth-modal-forgot"
                    onClick={() => alert("Please contact support or administrator to reset your password.")}
                  >
                    Forgot password
                  </button>
                </div>

                <button type="submit" className="auth-modal-submit-btn" disabled={submitting}>
                  {submitting ? "Signing in..." : "Sign in"}
                </button>

                <div className="auth-modal-footer">
                  <span className="muted">Don't have an account? </span>
                  <button
                    type="button"
                    className="auth-modal-switch"
                    onClick={() => { setError(""); setMode("register"); }}
                  >
                    Sign up
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="auth-modal-body">
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="modal_reg_first">First Name</label>
                    <input
                      id="modal_reg_first"
                      className="focus-ring"
                      value={reg.first_name}
                      onChange={setRegField("first_name")}
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="modal_reg_last">Last Name</label>
                    <input
                      id="modal_reg_last"
                      className="focus-ring"
                      value={reg.last_name}
                      onChange={setRegField("last_name")}
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="modal_reg_username">Username</label>
                  <input
                    id="modal_reg_username"
                    className="focus-ring"
                    autoComplete="username"
                    value={reg.username}
                    onChange={setRegField("username")}
                    placeholder="Choose username"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="modal_reg_email">Email address</label>
                  <input
                    id="modal_reg_email"
                    type="email"
                    className="focus-ring"
                    autoComplete="email"
                    value={reg.email}
                    onChange={setRegField("email")}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="modal_reg_phone">Phone number</label>
                  <input
                    id="modal_reg_phone"
                    type="tel"
                    className="focus-ring"
                    autoComplete="tel"
                    value={reg.phone}
                    onChange={setRegField("phone")}
                    placeholder="+91 ..."
                  />
                </div>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="modal_reg_pass">Password</label>
                    <input
                      id="modal_reg_pass"
                      type="password"
                      className="focus-ring"
                      autoComplete="new-password"
                      value={reg.password}
                      onChange={setRegField("password")}
                      placeholder="8+ chars"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="modal_reg_pass2">Confirm Password</label>
                    <input
                      id="modal_reg_pass2"
                      type="password"
                      className="focus-ring"
                      autoComplete="new-password"
                      value={reg.password2}
                      onChange={setRegField("password2")}
                      placeholder="Confirm"
                      required
                    />
                  </div>
                </div>

                {error && <div className="input-err-msg">{error}</div>}

                <button type="submit" className="auth-modal-submit-btn" disabled={submitting}>
                  {submitting ? "Creating account..." : "Create account"}
                </button>

                <div className="auth-modal-footer">
                  <span className="muted">Already have an account? </span>
                  <button
                    type="button"
                    className="auth-modal-switch"
                    onClick={() => { setError(""); setMode("login"); }}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
