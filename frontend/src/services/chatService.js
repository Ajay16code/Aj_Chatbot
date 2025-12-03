import { apiFetch } from "./api";

export function sendMessage(mode, message) {
  return apiFetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ mode, message }),
  });
}
