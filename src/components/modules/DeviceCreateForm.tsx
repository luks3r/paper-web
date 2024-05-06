import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { DeviceService, type Device } from "@/services";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string(),
  minCapacity: z.coerce.number().positive("Capacity must be positive"),
  maxCapacity: z.coerce.number().positive("Capacity must be positive"),
});

type DeviceCreateFormProps = {
  returnUrl: string;
  deviceID?: number;
};

export const DeviceCreateForm: React.FC<DeviceCreateFormProps> = ({
  returnUrl,
  deviceID,
}) => {
  let [currentDevice, SetCurrentDevice] = useState<Device>();
  const deviceService = new DeviceService();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      minCapacity: 0,
      maxCapacity: 0,
    },
  });

  useEffect(() => {
    if (deviceID !== undefined) {
      deviceService
        .getOneById(deviceID)
        .then((device) => {
          if (!device) {
            console.error("Failed to get device with id", deviceID);
            return;
          }
          SetCurrentDevice(device);
          form.reset({
            name: device.name,
            minCapacity: device.minCapacity,
            maxCapacity: device.maxCapacity,
          });
        })
        .catch((error) => {
          console.error("Failed to get device with id", deviceID, error);
        });
    }
  }, [deviceID]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values: z.infer<typeof formSchema>
  ) => {
    if (currentDevice) {
      console.warn("Updating device", currentDevice);
      const response = await deviceService.update(currentDevice.id, {
        name: values.name,
        minCapacity: values.minCapacity,
        maxCapacity: values.maxCapacity,
      });

      if (!response) {
        console.error("Failed to update device with id", currentDevice.id);
        return;
      }

      window.location.href = returnUrl;
      return;
    }

    const response = await deviceService.create({
      name: values.name,
      minCapacity: values.minCapacity,
      maxCapacity: values.maxCapacity,
    });

    if (!response) {
      console.error("Failed to create device");
      return;
    }

    window.location.href = returnUrl;
  };

  return (
    <div className="mx-auto pt-8 container">
      {currentDevice ? (
        <h1 className="pb-4 font-bold text-3xl">Edit {currentDevice.name}</h1>
      ) : (
        <h1 className="pb-4 font-bold text-3xl">Add Device</h1>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Device Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Device Name" {...field} />
                </FormControl>
                <FormDescription>Device&apos;s unique display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Capacity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0.1"
                    min={0}
                    step={0.1}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Device&apos;s minimum capacity (cm).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Capacity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="28.4"
                    min={0}
                    step={0.1}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Device&apos;s maximum capacity (cm).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{currentDevice ? "Update" : "Create"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default DeviceCreateForm;
