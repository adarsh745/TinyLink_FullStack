import axios from "axios";

const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: BASE,
});

export async function createLink(data) {
  return api.post("/api/links", data);
}

export async function getAllLinks() {
  return api.get("/api/links");
}

export async function getStats(code) {
  return api.get(`/api/links/${code}`);
}

export async function deleteLink(code) {
  return api.delete(`/api/links/${code}`);
}

export default {
  createLink,
  getAllLinks,
  getStats,
  deleteLink,
};
