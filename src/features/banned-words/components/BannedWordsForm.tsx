import { useState } from "react";
import type { CreateBannedWordRequest } from "../types";

interface BannedWordsFormProps {
    onSubmit: (payload: CreateBannedWordRequest) => Promise<void>;
}

export default function BannedWordsForm({ onSubmit }: BannedWordsFormProps) {
    const [word, setWord] = useState("");
    const [category, setCategory] = useState("");
    const [severity, setSeverity] = useState<number | "">("");
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!word.trim()) return;

        await onSubmit({
            word: word.trim(),
            category: category.trim() || undefined,
            severity: severity === "" ? undefined : String(severity),
            isActive,
        });

        setWord("");
        setCategory("");
        setSeverity("");
        setIsActive(true);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <input
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
            </div>

            <div>
                <input
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>

            <div>
                <input
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Severity"
                    type="number"
                    value={severity}
                    onChange={(e) =>
                        setSeverity(e.target.value === "" ? "" : Number(e.target.value))
                    }
                />
            </div>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
                Active
            </label>

            <button type="submit" className="border rounded px-4 py-2">
                Add banned word
            </button>
        </form>
    );
}
