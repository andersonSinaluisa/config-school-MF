import { HEIGHT_X_HOUR } from "@/lib/time";

export const START_HOUR = 6;

export function timeToMinutes(time: string) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

export function minutesToPixels(minutes: number) {
    return (minutes / 60) * HEIGHT_X_HOUR;
}

export function formatTime(minutes: number) {
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}
