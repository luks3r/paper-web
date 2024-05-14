const BASE_URL = process.env.NEXT_PUBLIC_PAPER_API_URL;
export const BASE_API = `${BASE_URL}/api/v1`;
export const api = {
  devices: {
    index: `${BASE_API}/devices`,
    getOne: (id: number) => `${BASE_API}/devices/${id}`,
    getAll: () => `${BASE_API}/devices`,
    create: () => `${BASE_API}/devices`,
    update: (id: number) => `${BASE_API}/devices/${id}`,
    delete: (id: number) => `${BASE_API}/devices/${id}`,
    deleteAll: () => `${BASE_API}/devices`,
  },
  records: {
    index: `${BASE_API}/records`,
    getOne: (id: number) => `${BASE_API}/records/${id}`,
    getAll: () => `${BASE_API}/records`,
    create: () => `${BASE_API}/records`,
    update: (id: number) => `${BASE_API}/records/${id}`,
    delete: (id: number) => `${BASE_API}/records/${id}`,
    deleteAll: () => `${BASE_API}/records`,
  }
};
