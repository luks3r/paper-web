import { env } from "process";

const BASE_URL = env.PAPER_API_URL || "http://localhost:3030";
export const BASE_API = `${BASE_URL}/api/v1`;
export const api = {
  devices: `${BASE_API}/devices`,
  records: `${BASE_API}/records`,
};
