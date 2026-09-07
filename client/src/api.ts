import type { Fan } from "./types";

// Ask the Express server for the list of fans.
export async function fetchFans(): Promise<Fan[]> {
  const response = await fetch("/api/fans");

  if (!response.ok) {
    throw new Error("Could not load the fans from the server.");
  }

  return response.json();
}
