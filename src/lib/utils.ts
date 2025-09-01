import { AbstractFailure } from "@/scolar/domain/failure"
import { isAxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export function calculateDuration(startDate: Date, endDate: Date) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const duration = Math
    .floor((end.getTime() - start.getTime()) / 1000)

  const days = Math.floor(duration / (3600 * 24))
  const hours = Math.floor((duration % (3600 * 24)) / 3600)
  const minutes = Math.floor((duration % (3600)) / 60)
  const seconds = Math.floor(duration % 60)
  const formattedDuration = []
  if (days > 0) formattedDuration.push(`${days}d`)
  if (hours > 0) formattedDuration.push(`${hours}h`)
  if (minutes > 0) formattedDuration.push(`${minutes}m`)
  if (seconds > 0) formattedDuration.push(`${seconds}s`)
  return formattedDuration.join(" ")
}

export function generateVibrantPalette(id: number) {
  // Hash simple → valor estable
  const normalized = Math.abs(id);
  const hash = (normalized * 2654435761) % 2 ** 32;

  // Generar RGB base directamente del hash
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  // Convertir a HSL para jugar con la luminosidad
  let [h, s, l] = rgbToHsl(r, g, b);

  // Forzar saturación alta → vibrante
  s = Math.min(1, s * 1.2 + 0.2);
  // Luminosidad media → no tan apagado
  l = Math.min(0.7, Math.max(0.4, l));

  const base = rgbToHex(...hslToRgb(h, s, l));
  const lighter1 = rgbToHex(...hslToRgb(h, s, Math.min(1, l + 0.15)));
  const lighter2 = rgbToHex(...hslToRgb(h, s, Math.min(1, l + 0.3)));
  const darker1 = rgbToHex(...hslToRgb(h, s, Math.max(0, l - 0.15)));
  const darker2 = rgbToHex(...hslToRgb(h, s, Math.max(0, l - 0.3)));

  // ---- Cálculo foreground (texto legible) ----
  const [br, bg, bb] = hexToRgb(base);
  const luminance =
    0.2126 * (br / 255) ** 2.2 +
    0.7152 * (bg / 255) ** 2.2 +
    0.0722 * (bb / 255) ** 2.2;

  const foreground = luminance > 0.5 ? "#000000" : "#FFFFFF";

  return { base, lighter1, lighter2, darker1, darker2, foreground };
}

// Utils auxiliares
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const parsed = hex.replace("#", "");
  return [
    parseInt(parsed.substring(0, 2), 16),
    parseInt(parsed.substring(2, 4), 16),
    parseInt(parsed.substring(4, 6), 16),
  ];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // gris
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function extractErrorMessage(error: unknown) {
  if(isAxiosError(error)) {
    const message = error.response?.data?.message || error.response?.data;
    const _error = error.response?.data?.error;
    return new AbstractFailure(
      _error || "UNKNOWN_ERROR",
      message || "An unknown error occurred",
      "root"
    )
  }

  if (error instanceof AbstractFailure) {
    return error
  }
  return new AbstractFailure(
    "UNKNOWN_ERROR",
    error instanceof Error ? error.message : "An unknown error occurred",
    "root"
  )
}

