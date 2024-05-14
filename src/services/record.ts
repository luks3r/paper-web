import { api } from "./constants";

export interface DataRecord {
  id: number;
  deviceId: number;
  batteryLevel: number;
  fillLevel: number;
  createdAt: Date;
}

export interface RecordCreate {
  deviceId: number;
  fillLevel: number;
  batteryLevel: number;
  createdAt: number;
}

export interface RecordUpdate {
  deviceId?: number;
  fillLevel?: number;
  batteryLevel?: number;
  createdAt?: number;
}

export class RecordService {
  public static api = api.records;

  async getOneById(id: number): Promise<DataRecord | null> {
    const response = await fetch(RecordService.api.getOne(id));
    if (!response.ok) {
      return null;
    }
    return await response.json();
  }

  async getAll(limit: number = 10, offset: number = 0): Promise<DataRecord[]> {
    const response = await fetch(api.devices.getAll());
    if (!response.ok) {
      return [];
    }
    return await response.json();
  }

  async create(device: RecordCreate): Promise<DataRecord | null> {
    const response = await fetch(RecordService.api.create(), {
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
    const response = await fetch(RecordService.api.delete(id), {
      method: "DELETE",
    });
    return response.ok;
  }

  async update(id: number, device: RecordUpdate): Promise<DataRecord | null> {
    const response = await fetch(RecordService.api.update(id), {
      method: "PUT",
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
}
