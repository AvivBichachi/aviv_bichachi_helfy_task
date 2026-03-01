import { useEffect, useMemo, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import "../styles/taskList.css";

export default function TaskList({ tasks, onDelete, deletingId, onToggle, togglingId, onUpdate, updatingId, updateError }) {

    const length = tasks.length;
    const [index, setIndex] = useState(0);
    const [offset, setOffset] = useState(1);
    const [animate, setAnimate] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const isAnimatingRef = useRef(false);


    useEffect(() => {
        if (length === 0) return;
        if (index >= length) setIndex(0);
    }, [length, index]);

    const prevIndex = useMemo(() => (length ? (index - 1 + length) % length : 0), [index, length]);
    const nextIndex = useMemo(() => (length ? (index + 1) % length : 0), [index, length]);

    const slides = useMemo(() => {
        if (length === 0) return [];
        return [tasks[prevIndex], tasks[index], tasks[nextIndex]];
    }, [tasks, prevIndex, index, nextIndex, length]);

    if (length === 0) {
        return <p>No tasks to show. Add a task above or change the filter.</p>;
    }

    function goNext() {
        if (isEditing) return;
        if (length <= 1 || isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        setAnimate(true);
        setOffset(2);
    }

    function goPrev() {
        if (isEditing) return;
        if (length <= 1 || isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        setAnimate(true);
        setOffset(0);
    }

    function jumpTo(index) {
        if (isEditing) return;
        if (isAnimatingRef.current) return;
        setIndex(index);
        setAnimate(false);
        setOffset(1);
    }

    function handleTransitionEnd(e) {
        if (e.target !== e.currentTarget) return;
        if (!animate) return;

  
        setAnimate(false);

        setIndex((curr) => {
            if (offset === 2) return (curr + 1) % length;
            if (offset === 0) return (curr - 1 + length) % length;
            return curr;
        });

        requestAnimationFrame(() => {
            setOffset(1);
            isAnimatingRef.current = false;
        });
    }

    const translateX = offset === 0 ? "0%" : offset === 1 ? "-100%" : "-200%";

    return (
        <section>
            <div className="carousel">
                <button className="carouselBtn" type="button" onClick={goPrev} disabled={length <= 1 || isEditing}>
                    ‹
                </button>

                <div className="viewport">
                    <div
                        className={`track ${animate ? "animate" : ""}`}
                        style={{ transform: `translateX(${translateX})` }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {slides.map((task, i) => (
                            <div className="slide" key={`${task.id}-${i}`}>
                                <TaskItem
                                    task={task}
                                    onDelete={onDelete}
                                    isDeleting={deletingId === task.id}
                                    onToggle={onToggle}
                                    isToggling={togglingId === task.id}
                                    onUpdate={onUpdate}
                                    isUpdating={updatingId === task.id}
                                    updateError={updateError}
                                    onEditingChange={setIsEditing}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button className="carouselBtn" type="button" onClick={goNext} disabled={length <= 1 || isEditing}>
                    ›
                </button>
            </div>

            {length > 1 && (
                <div className="dots">
                    {tasks.map((t, i) => (
                        <button
                            key={t.id}
                            type="button"
                            disabled={isEditing}
                            onClick={() => jumpTo(i)}
                            aria-label={`Go to task ${i + 1}`}
                            className={`dot ${i === index ? "active" : ""}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}