import { useEffect, useState } from "react";
import("../styles/TaskList.css")
export default function TaskItem({ task, onDelete, isDeleting, onToggle, isToggling, onUpdate, isUpdating, updateError, onEditingChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftTitle, setDraftTitle] = useState(task.title ?? "");
    const [draftDescription, setDraftDescription] = useState(task.description ?? "");
    const [draftPriority, setDraftPriority] = useState(task.priority ?? "medium");

    useEffect(() => {
        if (isEditing) return;
        setDraftTitle(task.title ?? "");
        setDraftDescription(task.description ?? "");
        setDraftPriority(task.priority ?? "medium");
    }, [task.id, task.title, task.description, task.priority, isEditing]);

    function startEdit() {
        setDraftTitle(task.title ?? "");
        setDraftDescription(task.description ?? "");
        setDraftPriority(task.priority ?? "medium");
        setIsEditing(true);
        onEditingChange?.(true);
    }

    function cancelEdit() {
        setDraftTitle(task.title ?? "");
        setDraftDescription(task.description ?? "");
        setDraftPriority(task.priority ?? "medium");
        setIsEditing(false);
        onEditingChange?.(false);
    }

    async function saveEdit() {
        const title = draftTitle.trim();
        const description = draftDescription.trim();
        const priority = draftPriority;

        if (!title) return;

        const payload = { title, description, priority };

        const noChange =
            payload.title === (task.title ?? "") &&
            payload.description === (task.description ?? "") &&
            payload.priority === (task.priority ?? "medium");

        if (noChange) {
            setIsEditing(false);
            onEditingChange?.(false);
            return;
        }

        const ok = await onUpdate(task.id, payload);
        if (ok) {
            setIsEditing(false);
            onEditingChange?.(false);
        }
    }

    const busy = isUpdating || isDeleting || isToggling;

    return (
        <li
            style={{
                listStyle: "none",
                width: "100%",
                margin: 0,
                padding: 0,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 420,
                    margin: "0 auto",
                    border: "1px solid #333",
                    borderRadius: 12,
                    padding: 14,
                    background: "#1f1f1f",
                    color: "#f2f2f2",
                    minHeight: 180
                }}
            >
                {!isEditing ? (
                    // Showing task
                    <div style={{ display: "grid", gap: 8 }}>
                        <div style={{ textAlign: "center" }}>
                            <div
                                style={{
                                    fontWeight: 700,
                                    fontSize: 18,
                                    textDecoration: task.completed ? "line-through" : "none",
                                    wordBreak: "break-word",
                                    overflowWrap: "anywhere",
                                }}
                            >
                                {task.title}
                            </div>

                            <div style={{ opacity: 0.85, marginTop: 2 }}>
                                <span className={`priority priority-${task.priority}`}>
                                    {task.priority.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {task.description && (
                            <div style={{
                                textAlign: "center",
                                opacity: 0.9,
                                wordBreak: "break-word",
                                overflowWrap: "anywhere",
                            }}>
                                {task.description}
                            </div>
                        )}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 8,
                                flexWrap: "wrap",
                                marginTop: 6,
                            }}
                        >
                            <button className="btn" type="button" onClick={startEdit} disabled={busy}>
                                Edit
                            </button>

                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => {
                                    if (!window.confirm("Are you sure you want to delete this task?")) return;
                                    onDelete(task.id);
                                }}
                                disabled={busy}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>

                            <button className="btn" type="button" onClick={() => onToggle(task.id)} disabled={busy}>
                                {task.completed ? "Mark as todo" : "Mark as done"}
                            </button>
                        </div>
                    </div>
                ) : ( // showing edit screen
                    <div style={{ display: "grid", gap: 10 }}>
                        {updateError && <p className="error" style={{ margin: 0 }}>{updateError}</p>}

                        <input
                            className="input"
                            value={draftTitle}
                            onChange={(e) => setDraftTitle(e.target.value)}
                            disabled={isUpdating}
                            placeholder="Set title..."
                        />

                        <textarea
                            className="textarea"
                            value={draftDescription}
                            onChange={(e) => setDraftDescription(e.target.value)}
                            disabled={isUpdating}
                            placeholder="Set description..."
                            rows={3}
                        />

                        <select
                            className="select"
                            value={draftPriority}
                            onChange={(e) => setDraftPriority(e.target.value)}
                            disabled={isUpdating}
                        >
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>

                        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 4 }}>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={saveEdit}
                                disabled={isUpdating || draftTitle.trim() === ""}
                            >
                                {isUpdating ? "Saving..." : "Save"}
                            </button>

                            <button className="btn" type="button" onClick={cancelEdit} disabled={isUpdating}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </li>
    );
}
