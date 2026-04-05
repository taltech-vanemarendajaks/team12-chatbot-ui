import type { BannedWord } from "../types";

interface BannedWordsListProps {
    words: BannedWord[];
    onDelete: (id: number) => Promise<void>;
}

export default function BannedWordsList({
                                            words,
                                            onDelete,
                                        }: BannedWordsListProps) {
    if (words.length === 0) {
        return <p>No banned words found.</p>;
    }

    return (
        <div className="space-y-2">
            {words.map((word) => (
                <div
                    key={word.id}
                    className="border rounded p-3 flex items-center justify-between"
                >
                    <div>
                        <div><strong>{word.word}</strong></div>
                        <div>Category: {word.category || "-"}</div>
                        <div>Severity: {word.severity ?? "-"}</div>
                        <div>Status: {word.isActive ? "Active" : "Inactive"}</div>
                    </div>

                    <button
                        className="border rounded px-3 py-1"
                        onClick={() => onDelete(word.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}