import { useCallback, useEffect, useMemo, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import api from "../api/client";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sortedTodos = useMemo(() => [...todos].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)), [todos]);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/todos");
      setTodos(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleCreate = async event => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const { data } = await api.post("/todos", { title: title.trim() });
      setTodos(prev => [data, ...prev]);
      setTitle("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create todo");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const { data } = await api.put(`/todos/${id}`, { completed: !completed });
      setTodos(prev => prev.map(todo => (todo._id === id ? data : todo)));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update todo");
    }
  };

  const deleteTodo = async id => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete todo");
    }
  };

  return (
    <div className="max-h-screen  text-white absolute inset-0">
    <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-14">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Hello {user?.name?.split(" ")[0] || "there"}
            </h1>
            <p className="mt-1 text-sm text-neutral-500">Stay on top of your tasks and celebrate your progress</p>
          </div>
          <button
            onClick={logout}
            className="group flex items-center gap-2 rounded-xl border border-white/20 bg-neutral-950 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-white hover:text-white"
          >
            Log out
          </button>
        </header>

        <section className="rounded-3xl border border-white/10 bg-neutral-950 p-8 transition duration-500">
          <form onSubmit={handleCreate} className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder="What would you like to accomplish?"
                className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PlusIcon className="h-5 w-5" />
              {submitting ? "Adding" : "Add Todo"}
            </button>
          </form>
          {error && (
            <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white">{error}</p>
          )}
        </section>

        <section className="flex-1 max-h-[50vh] overflow-y-auto scrollbar-none py-4 px-2">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-20 w-20 rounded-full border-4 border-white/10 border-t-white animate-spin" />
            </div>
          ) : (
            <div className="grid gap-4">
              {sortedTodos.map(todo => (
                <div
                  key={todo._id}
                  className="bg-neutral-950/10 flex items-center justify-between rounded-3xl border border-white px-6 py-5 hover:bg-gray-900"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTodo(todo._id, todo.completed)}
                      className={`relative flex h-5 w-5  rounded-full border  ${todo.completed ? "bg-green-500" : "bg-neutral-600"} `}
                    >
                    </button>
                    <div>
                      <p className={`text-lg font-semibold transition-colors duration-300 ${todo.completed ? "text-neutral-500 line-through" : "text-white"}`}>
                        {todo.title}
                      </p>
                      <p className="text-xs uppercase  text-neutral-500">
                        {new Date(todo.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="rounded-2xl border border-white/20 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {!sortedTodos.length && (
                <div className="rounded-3xl border border-dashed border-white/15 bg-neutral-950 p-10 text-center text-neutral-500 transition-opacity duration-500">
                  Everything is clear. Add a new todo to get started.
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

