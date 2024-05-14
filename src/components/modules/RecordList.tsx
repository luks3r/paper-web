import DataTable from "@/components/general/DataTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  RecordService,
  DeviceService,
  type Device,
  type DataRecord,
} from "@/services";

const columnHelper = createColumnHelper<DataRecord>();

export const deviceDataColumns: ColumnDef<DataRecord, any>[] = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor((row) => row.deviceId, {
    id: "deviceId",
    header: "Device",
  }),
  columnHelper.accessor((row) => row.batteryLevel, {
    id: "batteryLevel",
    header: "Battery Level",
  }),
  columnHelper.accessor((row) => row.fillLevel, {
    id: "fillLevel",
    header: "Fill Level",
  }),
  columnHelper.accessor((row) => row.createdAt, {
    id: "createdAt",
    header: "Timestamp",
  }),

  columnHelper.display({
    id: "actions",
    cell: (info) => {
      return (
        <div className="flex justify-end items-center gap-2">
          <Button variant="destructive" asChild>
            <a href={RecordService.api.delete(info.row.getValue("id"))}>
              <Trash2 className="size-3" />
            </a>
          </Button>
        </div>
      );
    },
  }),
];

type DeviceListProps = {};

const DeviceList: React.FC<DeviceListProps> = () => {
  const [devices, setDevices] = useState<DataRecord[]>();
  const [errors, setErrors] = useState<string[]>([]);
  const recordService = new RecordService();

  useEffect(() => {
    recordService
      .getAll()
      .then((devices) => {
        if (!devices) {
          console.error("Failed to get devices");
          setErrors(["Failed to get devices"]);
          return;
        }
        setDevices(devices);
      })
      .catch((error) => {
        console.error("Failed to get devices", error);
        setErrors(["Failed to get devices"]);
      });
  }, []);

  return (
    <>
      {devices ? (
        <DataTable columns={deviceDataColumns} data={devices} />
      ) : errors?.length > 0 ? (
        <>
          {errors.map((error) => (
            <div className="text-red">{error}</div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default DeviceList;
