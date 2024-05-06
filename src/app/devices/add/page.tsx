'use client';

import DeviceCreateForm from "@/components/modules/DeviceCreateForm";
import { useSearchParams } from "next/navigation";

export default function AddDevice() {
  const searchParams = useSearchParams()!;
  const deviceId = searchParams.has("deviceId")
    ? parseInt(searchParams.get("deviceId")!)
    : undefined;
  const returnUrl = searchParams.has("returnUrl")
    ? searchParams.get("returnUrl")!
    : "/";

  return <DeviceCreateForm returnUrl={returnUrl} deviceID={deviceId} />;
}
