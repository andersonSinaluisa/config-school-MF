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




export function extractErrorMessage(error: unknown) {
  if(isAxiosError(error)) {
    const message = error.response?.data?.message;
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