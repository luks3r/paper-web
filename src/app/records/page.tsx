'use client';

import RecordList from "@/components/modules/RecordList";

export default function Records() {
  return (
      <div className="mx-auto mt-8 container">
      <p className="items-center font-bold text-3xl text-left">Records List</p>
      <RecordList />
    </div>
  );
}
