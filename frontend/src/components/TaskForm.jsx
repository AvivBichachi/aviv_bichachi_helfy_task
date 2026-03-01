import { useState } from "react";

export default function TaskForm({ onCreate, isSubmitting, error }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const ok = await onCreate({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    if (ok) {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <div className="taskFormRow">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          disabled={isSubmitting}
        />

        <select
          className="select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isSubmitting}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>

      <textarea
        className="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description..."
        rows={3}
        disabled={isSubmitting}
      />

      <div className="taskFormActions">
        <button className="btn btn-primary" type="submit" disabled={isSubmitting || title.trim() === ""}>
          {isSubmitting ? "Adding..." : "Create"}
        </button>
      </div>
    </form>
  );
}