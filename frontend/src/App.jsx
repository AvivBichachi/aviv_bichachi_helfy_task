import { useEffect, useMemo, useState } from "react";
import { getTasks, createTask, deleteTask, toggleTask, updateTask, } from "./services/tasksApi";
import "./styles/App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // options : all | todo | done
  const [priorityFilter, setPriorityFilter] = useState("all"); // options : all | low | medium | high

  // load tasks
  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getTasks();
        if (isMounted) setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        if (isMounted) setError(err?.message || "Failed to fetch tasks");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  //
  const visibleTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = tasks.filter((t) => {
      const title = String(t.title ?? "").toLowerCase();

      const matchesQuery =
        normalizedQuery === "" || title.includes(normalizedQuery);

      const isCompleted = !!t.completed;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "done" && isCompleted) ||
        (statusFilter === "todo" && !isCompleted);

      const matchesPriority =
        priorityFilter === "all" || t.priority === priorityFilter;

      return matchesQuery && matchesStatus && matchesPriority;
    });

    filtered.sort((a, b) => b.id - a.id);

    return filtered;
  }, [tasks, query, statusFilter, priorityFilter]);

  async function handleCreate(payload) {
    try {
      setIsCreating(true);
      setCreateError(null);
      setError(null);

      const created = await createTask(payload);
      setTasks((prev) => [created, ...prev]);

      return true;
    } catch (err) {
      setCreateError(err?.message || "Failed to create task");
      return false;
    } finally {
      setIsCreating(false);
    }
  }

  async function handleUpdate(id, payload) {
    try {
      setUpdatingId(id);
      setUpdateError(null);
      setError(null);

      const updated = await updateTask(id, payload);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));

      return true;
    } catch (err) {
      setUpdateError(err?.message || "Failed to update task");
      return false;
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id) {
    try {
      setDeletingId(id);
      setError(null);

      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err?.message || "Failed to delete task");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggle(id) {
    try {
      setTogglingId(id);
      setError(null);

      const updated = await toggleTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err?.message || "Failed to toggle completion");
    } finally {
      setTogglingId(null);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager</h1>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        <div className="card">
          <h2 className="cardTitle">Create a task</h2>

          

          <div style={{ height: 10 }} />

          <TaskForm onCreate={handleCreate} isSubmitting={isCreating} error={createError} />
        </div>
        <div className="card">
          <h2 className="cardTitle">Filter & Search</h2>

        <TaskFilter
            query={query}
            onQueryChange={setQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
          />
          </div>

        <div className="card">
          <h2 className="cardTitle">Task List</h2>

          {!isLoading && !error && tasks.length === 0 && (
            <p>No tasks yet. Create your first one.</p>
          )}

          {!isLoading && !error && tasks.length > 0 && visibleTasks.length === 0 && (
            <div style={{textAlign:"center"}}>
              <p>No tasks match your current filters.</p>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setQuery("");
                  setStatusFilter("all");
                  setPriorityFilter("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          {!isLoading && !error && visibleTasks.length > 0 && (
            <TaskList
              tasks={visibleTasks}
              onDelete={handleDelete}
              deletingId={deletingId}
              onToggle={handleToggle}
              togglingId={togglingId}
              onUpdate={handleUpdate}
              updatingId={updatingId}
              updateError={updateError}
            />
          )}
        </div>
      </div>
    </div>
  )
}