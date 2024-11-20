"use client";

import { ArrowBigUpDashIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

const promote = (id: number) => {
  console.log(`Promoting employee ${id}`);
};

const terminate = (id: number) => {
  console.log(`Terminating employee ${id}`);
};

export function BigEmployeeOptions({ id }: { id: number }) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="positive" size="sm" onClick={() => promote(id)}>
        <ArrowBigUpDashIcon size={16} />
        <span className="hidden md:inline">Promote</span>
      </Button>
      <Button variant="destructive" size="sm" onClick={() => terminate(id)}>
        <TrashIcon size={16} />
        <span className="hidden md:inline">Terminate</span>
      </Button>
    </div>
  );
}
