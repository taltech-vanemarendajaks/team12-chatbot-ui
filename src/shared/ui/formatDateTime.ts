export function formatDateTime(dateString: string | Date): string {
    const raw = typeof dateString === "string" && !dateString.endsWith("Z") && !dateString.includes("+")
        ? dateString + "Z"
        : dateString;
    const date = new Date(raw);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return `${day}.${month}.${year} ${time}`;
}
