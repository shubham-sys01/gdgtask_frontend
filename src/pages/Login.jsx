import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import api from "../api/client";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = event => {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.token, data.user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex w-full">

    <div className="hidden md:block w-1/2 bg-blue-500 ">
    <img src="./public/3103.jpg" alt="Login" className="w-full h-full object-cover" />
      </div>
    <AuthCard
      title= "SIGN IN"
      subtitle="Sign in to continue managing your tasks"
      footer={
        <span>
          Need an account? <Link to="/register" className="text-white underline-offset-4 hover:underline">Create one</Link>
        </span>
      }
    >
      
      <form onSubmit={handleSubmit} className="space-y-5 transition-opacity duration-500">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white transition focus:border-white focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white transition focus:border-white focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>
        {error && (
          <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthCard>
    </div>
    </>
  );
};

export default Login;

