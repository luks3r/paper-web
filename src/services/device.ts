import { api } from "./constants";

export interface Device {
  id: number;
  name: string;
  minCapacity: number;
  maxCapacity: number;
}

export interface DeviceCreate {
  name: string;
  minCapacity?: number;
  maxCapacity?: number;
}

export interface DeviceUpdate {
  name?: string;
  minCapacity?: number;
  maxCapacity?: number;
}

export class DeviceService {
  private static BASE_API: string = api.devices;

  async getOneById(id: number): Promise<Device | null> {
    const response = await fetch(`${DeviceService.BASE_API}/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  }

  async getAll(limit: number = 10, offset: number = 0): Promise<Device[]> {
    const response = await fetch(DeviceService.BASE_API);
    if (!response.ok) {
      console.error("Failed to get devices", await response.json());
      return [];
    }
    return await response.json();
  }

  async create(device: DeviceCreate): Promise<Device | null> {
    const response = await fetch(DeviceService.BASE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  }

  async delete(id: number): Promise<boolean> {
    const response = await fetch(`${DeviceService.BASE_API}/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  }

  async update(id: number, device: DeviceUpdate): Promise<Device | null> {
    const response = await fetch(`${DeviceService.BASE_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    });
    if (!response.ok) {
      console.error("Failed to update device", response.status, await response.text());
      return null;
    }
    return await response.json();
  }
}
