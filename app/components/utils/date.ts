// components/utils/date.ts

export function getDatesInRange(start: string, end: string): string[] {
    const dates: string[] = [];
    const current = new Date(start);
    const last = new Date(end);
    while (current <= last) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
    }
    return dates;
}
