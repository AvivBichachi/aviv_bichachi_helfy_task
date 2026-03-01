export default function TaskFilter({ query, onQueryChange, statusFilter, onStatusChange, priorityFilter, onPriorityChange }) {
    return (
        <div className="filterBar">
            <input
                className="input"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search by title..."
            />

            <select
                className="select"
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <option value="all">All</option>
                <option value="todo">Todo</option>
                <option value="done">Done</option>
            </select>

            <select
                className="select"
                value={priorityFilter}
                onChange={(e) => onPriorityChange(e.target.value)}
            >
                <option value="all">All priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
    );
}