import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import api from "../api/client";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = event => {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/auth/register", form);
      setSuccess("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full">

    <div className="hidden md:block w-1/2 bg-red-500 ">
    <img src="/3103.jpg" alt="Login" className="w-full h-full object-cover" />
      </div>
    <AuthCard
      title="Create an account"
      subtitle="Join us and keep your tasks organized"
      footer={
        <span>
          Already have an account? <Link to="/login" className="text-white underline-offset-4 hover:underline">Sign in</Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5 transition-opacity duration-500">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white transition focus:border-white focus:outline-none"
            placeholder="Your name"
            required
          />
        </div>
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
            minLength={6}
            required
          />
        </div>
        {error && (
          <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">{error}</p>
        )}
        {success && (
          <p className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white">{success}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </AuthCard>
    </div>
  );
};

export default Register;

