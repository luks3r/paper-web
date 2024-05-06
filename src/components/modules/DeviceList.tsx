import DataTable from "@/components/general/DataTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { DeviceService, type Device } from "@/services";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<Device>();

export const deviceColumns: ColumnDef<Device, any>[] = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor((row) => row.minCapacity, {
    id: "minCapacity",
    header: "Min Capacity",
  }),
  columnHelper.accessor((row) => row.maxCapacity, {
    id: "maxCapacity",
    header: "Max Capacity",
  }),

  columnHelper.display({
    id: "actions",
    cell: (info) => {
      return (
        <div className="flex justify-end items-center gap-2">
          <Button variant="outline" asChild>
            <a href={`/devices/add?deviceId=${info.row.getValue("id")}`}>
              <Pencil className="size-3" />
            </a>
          </Button>
          <Button variant="destructive" asChild>
            <a href={`/devices/delete?deviceId=${info.row.getValue("id")}`}>
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
  const [devices, setDevices] = useState<Device[]>();
  const [errors, setErrors] = useState<string[]>([]);
  const deviceService = new DeviceService();

  useEffect(() => {
    deviceService
      .getAll()
      .then((devices) => {
        if (!devices) {
          console.error("Failed to get devices");
          setErrors(["Failed to get devices"]);
          return;
        }
        setDevices(devices);
      })
      .catch((err) => {
        console.error(err);
        setErrors(["Failed to get devices"]);
      });
  }, []);

  return (
    <>
      {devices ? (
        <DataTable columns={deviceColumns} data={devices} />
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
