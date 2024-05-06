"use client";

import DeviceCreateForm from "@/components/modules/DeviceCreateForm";

export default function AddDevice({
  searchParams,
}: {
  searchParams?: {
    deviceId?: string;
    returnUrl?: string;
  };
}) {
  const deviceId = searchParams?.deviceId
    ? parseInt(searchParams?.deviceId)
    : undefined;
  const returnUrl = searchParams?.returnUrl || "/";

  return <DeviceCreateForm returnUrl={returnUrl} deviceID={deviceId} />;
}
