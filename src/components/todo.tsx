import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarsBackground from "../StarsBackground";

interface TodoItem {
    id: string;
    text: string;
    done: boolean;
}

type Filter = "all" | "active" | "done";

const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "done", label: "Done" },
];

function Todo() {
    const [todo, setTodo] = useState<TodoItem[]>(() => {
        const savedTodos = localStorage.getItem("todos-v3");
        return savedTodos ? (JSON.parse(savedTodos) as TodoItem[]) : [];
    });
    const [input, setInput] = useState<string>("");
    const [filter, setFilter] = useState<Filter>("all");

    useEffect(() => {
        localStorage.setItem("todos-v3", JSON.stringify(todo));
    }, [todo]);

    const addToDo = (): void => {
        if (input.trim()) {
            setTodo((prev) => [
                ...prev,
                { id: crypto.randomUUID(), text: input.trim(), done: false },
            ]);
            setInput("");
        }
    };

    const deleteTodo = (id: string): void => {
        setTodo((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleDone = (id: string): void => {
        setTodo((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    };

    const updateTodo = (id: string): void => {
        const newTitle = prompt("Enter the updated task:");

        if (newTitle?.trim()) {
            setTodo((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, text: newTitle.trim() } : item
                )
            );
        }
    };

    const clearDone = (): void => {
        setTodo((prev) => prev.filter((item) => !item.done));
    };

    const filteredTodos = todo.filter((item) => {
        if (filter === "active") return !item.done;
        if (filter === "done") return item.done;
        return true;
    });

    const remaining = todo.filter((item) => !item.done).length;
    const doneCount = todo.length - remaining;

    return (
        <>
            <StarsBackground />

            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl shadow-purple-500/20 backdrop-blur-md">
                    <h1 className="mb-6 text-center text-3xl font-bold text-white">
                        To Do App ✅
                    </h1>

                    {/* start Input and Add Button */}
                    <div className="mb-4 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addToDo()}
                            className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                            type="text"
                            placeholder="Write a task..."
                        />

                        <button
                            onClick={addToDo}
                            className="rounded-lg bg-gradient-to-r from-sky-500 to-purple-500 px-4 py-2 text-white transition hover:opacity-90"
                            type="button"
                        >
                            Add
                        </button>
                    </div>
                    {/* End Input and Add Button */}

                    {/* start filters */}
                    <div className="mb-2 flex gap-2">
                        {filters.map((f) => (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                type="button"
                                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                                    filter === f.key
                                        ? "bg-gradient-to-r from-sky-500 to-purple-500 text-white"
                                        : "bg-white/10 text-white/70 hover:bg-white/20"
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                    {/* End filters */}

                    {/* start code of todo list */}
                    <div className="mt-4 flex flex-col">
                        <AnimatePresence initial={false}>
                            {filteredTodos.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                                    animate={{ opacity: 1, x: 0, height: "auto", marginBottom: 12 }}
                                    exit={{ opacity: 0, x: 80, height: 0, marginBottom: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/10 p-2">
                                        <div className="flex min-w-0 flex-1 items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={item.done}
                                                onChange={() => toggleDone(item.id)}
                                                className="h-4 w-4 shrink-0 cursor-pointer accent-green-500"
                                            />
                                            <span
                                                className={`break-words transition-all ${
                                                    item.done
                                                        ? "text-white/40 line-through"
                                                        : "text-white"
                                                }`}
                                            >
                                                {item.text}
                                            </span>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => toggleDone(item.id)}
                                                className={`rounded px-2 py-1 text-sm text-white ${
                                                    item.done
                                                        ? "bg-gray-400 hover:bg-gray-500"
                                                        : "bg-green-500 hover:bg-green-600"
                                                }`}
                                                type="button"
                                            >
                                                {item.done ? "Undo" : "Done"}
                                            </button>

                                            <button
                                                onClick={() => updateTodo(item.id)}
                                                className="rounded bg-amber-500 px-2 py-1 text-sm text-white hover:bg-amber-600"
                                                type="button"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteTodo(item.id)}
                                                className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-700"
                                                type="button"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredTodos.length === 0 && (
                            <p className="py-4 text-center text-sm text-white/50">
                                {todo.length === 0
                                    ? "No tasks yet, add your first one 🚀"
                                    : "Nothing here"}
                            </p>
                        )}
                    </div>
                    {/* End code of todo list */}

                    {/* start footer */}
                    {todo.length > 0 && (
                        <div className="mt-2 flex items-center justify-between border-t border-white/20 pt-3 text-sm text-white/60">
                            <span>
                                {remaining} left · {doneCount} done
                            </span>

                            {doneCount > 0 && (
                                <button
                                    onClick={clearDone}
                                    type="button"
                                    className="text-red-400 hover:underline"
                                >
                                    Clear done
                                </button>
                            )}
                        </div>
                    )}
                    {/* End footer */}
                </div>
            </div>
        </>
    );
}

export default Todo;