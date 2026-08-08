import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Seo from "../../components/Seo";
import { useAuth } from "../../context/AuthContext";

const emptyReg = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  password2: "",
};

export default function Login() {
  const { login, register, user, loading } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reg, setReg] = useState(emptyReg);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    const dest = user.role === "ADMIN" || user.is_staff ? "/admin/" : "/client/";
    return <Navigate to={dest} replace />;
  }

  const setRegField = (k) => (e) => setReg((f) => ({ ...f, [k]: e.target.value }));

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const u = await login(username, password);
      navigate(u.role === "ADMIN" || u.is_staff ? "/admin/" : "/client/");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!reg.first_name.trim() || !reg.last_name.trim()) return setError("Please enter your full name.");
    if (!reg.username.trim()) return setError("Please choose a username.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(reg.email)) return setError("Please enter a valid email.");
    if (reg.password.length < 8) return setError("Password must be at least 8 characters.");
    if (reg.password !== reg.password2) return setError("Passwords do not match.");
    setSubmitting(true);
    try {
      const u = await register(reg);
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
    <>
      <Seo title="Portal Sign In | Sree Raam Shethu" noindex />
      <section className="auth">
        <div className="auth__inner">
          <div className="auth__brand" aria-hidden="true">SR</div>
          {mode === "login" ? (
            <>
              <h1 className="auth__title display">Sign In</h1>
              <p className="auth__sub muted">Enter your credentials to access your account workspace.</p>
              {error && <div className="form-note form-note--err" role="alert">{error}</div>}
              <form onSubmit={submitLogin} noValidate>
                <div className="field">
                  <label htmlFor="username">Username</label>
                  <input id="username" className="focus-ring" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" className="focus-ring" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn--solid focus-ring" disabled={submitting}>
                  {submitting ? "Signing in..." : "Sign in"}
                </button>
              </form>
              <p className="auth__alt muted">
                Don't have an account?{" "}
                <button type="button" className="auth__switch focus-ring" onClick={() => { setError(""); setMode("register"); }}>
                  Create a client account
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="auth__title display">Create Account</h1>
              <p className="auth__sub muted">Register to access your client projects.</p>
              {error && <div className="form-note form-note--err" role="alert">{error}</div>}
              <form onSubmit={submitRegister} noValidate>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="reg_first">First name</label>
                    <input id="reg_first" className="focus-ring" value={reg.first_name} onChange={setRegField("first_name")} />
                  </div>
                  <div className="field">
                    <label htmlFor="reg_last">Last name</label>
                    <input id="reg_last" className="focus-ring" value={reg.last_name} onChange={setRegField("last_name")} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="reg_username">Username</label>
                  <input id="reg_username" className="focus-ring" autoComplete="username" value={reg.username} onChange={setRegField("username")} />
                </div>
                <div className="field">
                  <label htmlFor="reg_email">Email</label>
                  <input id="reg_email" type="email" className="focus-ring" autoComplete="email" value={reg.email} onChange={setRegField("email")} />
                </div>
                <div className="field">
                  <label htmlFor="reg_phone">Phone number</label>
                  <input id="reg_phone" type="tel" className="focus-ring" autoComplete="tel" value={reg.phone} onChange={setRegField("phone")} placeholder="+91 ..." />
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="reg_password">Password</label>
                    <input id="reg_password" type="password" className="focus-ring" autoComplete="new-password" value={reg.password} onChange={setRegField("password")} />
                  </div>
                  <div className="field">
                    <label htmlFor="reg_password2">Confirm password</label>
                    <input id="reg_password2" type="password" className="focus-ring" autoComplete="new-password" value={reg.password2} onChange={setRegField("password2")} />
                  </div>
                </div>
                <button type="submit" className="btn btn--solid focus-ring" disabled={submitting}>
                  {submitting ? "Creating account..." : "Create account"}
                </button>
              </form>
              <p className="auth__alt muted">
                Already have an account?{" "}
                <button type="button" className="auth__switch focus-ring" onClick={() => { setError(""); setMode("login"); }}>
                  Log in
                </button>
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}