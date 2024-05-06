'use client';

import { Button } from "@/components/ui/button";
import DevicesList from "@/components/modules/DeviceList";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
      <div className="mx-auto mt-8 container">
      <p className="items-center font-bold text-3xl text-left">Device List</p>
      <DevicesList />

      <Button className="justify-between mt-4" variant="outline" asChild>
        <Link href="/devices/add">
          <CirclePlus className="mr-2 w-4 h-4 size-5" />
          <p>Add Device</p>
        </Link>
      </Button>
    </div>
  );
}
