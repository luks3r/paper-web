const BASE_URL = process.env.NEXT_PUBLIC_PAPER_API_URL;
export const BASE_API = `${BASE_URL}/api/v1`;
export const api = {
  devices: `${BASE_API}/devices`,
  records: `${BASE_API}/records`,
};
