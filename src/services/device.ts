import { api } from "./constants";

export interface Device {
  id: number;
  name: string;
  minCapacity: number;
  maxCapacity: number;
}

export interface DeviceCreate {
  id?: number;
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
  private static api = api.devices;

  async getOneById(id: number): Promise<Device | null> {
    const response = await fetch(DeviceService.api.getOne(id));
    if (!response.ok) {
      return null;
    }
    return await response.json();
  }

  async getAll(limit: number = 10, offset: number = 0): Promise<Device[]> {
    const response = await fetch(DeviceService.api.getAll());
    if (!response.ok) {
      console.error("Failed to get devices", await response.json());
      return [];
    }
    return await response.json();
  }

  async create(device: DeviceCreate): Promise<Device | null> {
    const response = await fetch(DeviceService.api.create(), {
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
    const response = await fetch(DeviceService.api.delete(id), {
      method: "DELETE",
    });
    return response.ok;
  }

  async update(id: number, device: DeviceUpdate): Promise<Device | null> {
    const response = await fetch(DeviceService.api.update(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    });
    if (!response.ok) {
      console.error(
        "Failed to update device",
        response.status,
        await response.text()
      );
      return null;
    }
    return await response.json();
  }
}
