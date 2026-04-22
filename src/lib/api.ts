type FetchMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestConfig = {
  method?: FetchMethod;
  body?: unknown;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const { method = "GET", body } = config;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = typeof payload?.error === "string" ? payload.error : `Request failed with ${response.status}`;
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export type ApiMenuItem = {
  id: number;
  name: string;
  category: string;
  price: number | string;
  description: string | null;
  image_key: string | null;
  is_active: boolean;
};

export type ApiReservation = {
  id: number;
  name: string;
  email: string | null;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  notes: string | null;
  status: "Pending" | "Confirmed" | "Cancelled";
  created_at: string;
};

export type ApiMessage = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export function getMenuItems() {
  return request<ApiMenuItem[]>("/api/menu-items");
}

export function getReservations() {
  return request<ApiReservation[]>("/api/reservations");
}

export function createReservation(payload: {
  name: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}) {
  return request<ApiReservation>("/api/reservations", { method: "POST", body: payload });
}

export function updateReservationStatus(id: number, status: ApiReservation["status"]) {
  return request<ApiReservation>(`/api/reservations/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
}

export function getMessages() {
  return request<ApiMessage[]>("/api/messages");
}

export function createMessage(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  return request<ApiMessage>("/api/messages", {
    method: "POST",
    body: payload,
  });
}

export function markMessageRead(id: number) {
  return request<ApiMessage>(`/api/messages/${id}/read`, {
    method: "PATCH",
  });
}

export function deleteMessage(id: number) {
  return request<void>(`/api/messages/${id}`, {
    method: "DELETE",
  });
}
