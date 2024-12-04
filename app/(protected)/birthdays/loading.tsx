import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CakeIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-start px-8 pt-2 pb-8 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Birthdays of the Month</h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-4 gap-8 w-full">
        <div className="flex flex-col gap-8 xl:col-span-3 2xl:col-span-3">
          <h2 className="text-lg font-bold">Upcoming Birthdays</h2>

          <div className="grid xl:grid-cols-2 gap-8 w-full xl:col-span-3">
            {[...Array(10)].map((_, index) => (
              <Card
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-sm transition-all duration-300 hover:transform hover:drop-shadow-md hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <CakeIcon className="text-gray-500" size={24} />
                  <div className="flex flex-col gap-2 py-1">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-24 h-3" />
                  </div>
                </div>
                <div>
                  <Skeleton className="w-16 h-3 my-1" />
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 xl:col-span-2 2xl:col-span-1">
          <h2 className="text-lg font-bold col-span-full">Past Birthdays</h2>
          <div className="grid gap-8 w-full xl:col-span-2 2xl:col-span-1">
            {[...Array(5)].map((_, index) => (
              <Card
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-sm transition-all duration-300 hover:transform hover:drop-shadow-md hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <CakeIcon className="text-gray-500" size={24} />
                  <div className="flex flex-col gap-2 py-1">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-24 h-3" />
                  </div>
                </div>
                <div>
                  <Skeleton className="w-16 h-3 my-1" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
