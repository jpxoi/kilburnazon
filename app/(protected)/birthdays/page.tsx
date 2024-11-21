import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BirthdayAPIResponse } from "@/interfaces";
import { CakeIcon } from "lucide-react";

function RelativeDateFormatter(date: string) {
  /* Function to format the date in a relative format e.g. 2 days ago or in 3 days */
  const today = new Date();

  /* date is in the format yyyy-mm-dd and is already this year */
  const birthday = new Date(date);

  const this_year_birthday = birthday.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });

  const diffTime = birthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Tomorrow";
  } else if (diffDays === -1) {
    return "Yesterday";
  } else if (diffDays > 0 && diffDays <= 7) {
    return `In ${diffDays} days`;
  } else if (diffDays < 0 && diffDays >= -7) {
    return `${-diffDays} days ago`;
  }

  if (diffDays > 0) {
    return `In ${diffDays} days on ${this_year_birthday}`;
  }

  if (diffDays < 0) {
    return `Was ${-diffDays} days ago on ${this_year_birthday}`;
  }

  return this_year_birthday;
}

export default async function BirthdaysPage() {
  const data = await fetch("http://localhost:8000/api/birthdays");
  const birthdays = (await data.json()) as BirthdayAPIResponse;

  const past_birthdays = birthdays.past;
  const upcoming_birthdays = birthdays.upcoming;

  return (
    <div className="flex flex-col items-center justify-start px-8 pt-2 pb-8 gap-4 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Birthdays of the Month</h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-4 gap-8 w-full">
        <div className="flex flex-col gap-8 xl:col-span-3 2xl:col-span-3">
          <h2 className="text-lg font-bold">Upcoming Birthdays</h2>

          <div className="grid xl:grid-cols-2 gap-8 w-full xl:col-span-3">
            {upcoming_birthdays.map((birthday) => (
              <Card
                key={birthday.id}
                className={`flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-sm transition-all duration-300 hover:transform hover:drop-shadow-md hover:scale-105 ${
                  RelativeDateFormatter(birthday.this_year_birthday) === "Today"
                    ? "border-2 border-orange-400 animate-border drop-shadow-md"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <CakeIcon
                    className={
                      RelativeDateFormatter(birthday.this_year_birthday) ===
                      "Today"
                        ? "animate-pulse text-orange-600"
                        : "text-gray-500"
                    }
                    size={24}
                  />
                  <div>
                    <p className="text-md font-bold">{birthday.name}</p>
                    <p className="text-sm text-gray-500">
                      {RelativeDateFormatter(birthday.this_year_birthday)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Turns {birthday.turns_age}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 xl:col-span-2 2xl:col-span-1">
          <h2 className="text-lg font-bold col-span-full">Past Birthdays</h2>
          <ScrollArea className="flex flex-col gap-4 w-full max-h-[80vh]">
            <div className="grid gap-8 w-full xl:col-span-2 2xl:col-span-1">
              {past_birthdays.map((birthday) => (
                <Card
                  key={birthday.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <CakeIcon size={24} />
                    <div>
                      <p className="text-md font-bold">{birthday.name}</p>
                      <p className="text-sm text-gray-500">
                        {RelativeDateFormatter(birthday.this_year_birthday)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Turned {birthday.turns_age}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
