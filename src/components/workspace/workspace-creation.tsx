"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";

// Calendar Component
interface CalendarProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelect }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={handlePrevMonth} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
        &lt;
      </button>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button onClick={handleNextMonth} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-gray-600 dark:text-gray-400 font-medium">
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);

        days.push(
          <div
            key={day.toString()}
            className={`p-2 text-center cursor-pointer rounded-lg transition-colors ${
              isCurrentMonth ? "text-gray-800 dark:text-gray-200" : "text-gray-300 dark:text-gray-500"
            } ${isSelected ? "bg-blue-500 text-white" : "hover:bg-blue-200 dark:hover:bg-blue-600"}`}
            onClick={() => onSelect(day)} // Call onSelect to update the date
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="calendar bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

// Main Component
export default function AddWorkSpace() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [teamLead, setTeamLead] = useState("");
  const [moderator, setModerator] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      projectTitle,
      projectDescription,
      deadline,
      teamLead,
      moderator,
    });
    setProjectTitle("");
    setProjectDescription("");
    setDeadline(null);
    setTeamLead("");
    setModerator("");
    setIsFormVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create New Workspace</CardTitle>
            <CardDescription>
              Enter the details for your new workspace project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title</Label>
              <Input
                id="projectTitle"
                placeholder="Enter project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                placeholder="Enter project description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar selectedDate={deadline} onSelect={setDeadline} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamLead">Team Lead</Label>
              <Input
                id="teamLead"
                placeholder="Enter team lead name"
                value={teamLead}
                onChange={(e) => setTeamLead(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moderator">Moderator</Label>
              <Input
                id="moderator"
                placeholder="Enter moderator name"
                value={moderator}
                onChange={(e) => setModerator(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsFormVisible(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
