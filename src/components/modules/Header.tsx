'use client';

import { ModeToggle } from "@/components/general/ModeToggle";

type HeaderProps = {};

function Header({}: HeaderProps) {
  return (
    <header className="top-0 z-10 sticky flex flex-row justify-between items-center gap-1 bg-background px-4 border-b h-[57px]">
      <h1 className="font-semibold text-xl">Paper++</h1>
      <ModeToggle />
    </header>
  );
}

export default Header;
