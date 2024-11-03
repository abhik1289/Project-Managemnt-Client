"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  CheckSquare,
  ListTodo,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
} from "lucide-react";
import TaskList from "./dashboard-task-list";
import TeamMemberList from "./team-member";




const targetCounts = { projects: 12, tasks: 78, assigned: 32, due: 15 };

export default function HomeBox() {
  const [counts, setCounts] = useState({
    projects: 0,
    tasks: 0,
    assigned: 0,
    due: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) => {
        let allReached = true;
        const updatedCounts = Object.keys(targetCounts).reduce((acc, key) => {
          acc[key] =
            prevCounts[key] < targetCounts[key]
              ? prevCounts[key] + 1
              : prevCounts[key];
          if (acc[key] < targetCounts[key]) allReached = false;
          return acc;
        }, {});

        if (allReached) clearInterval(interval);
        return updatedCounts;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

 

  return (
    <div className="p-2 main_wrapper">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.keys(counts).map((key, index) => {
          const icons = [Briefcase, ListTodo, CheckSquare, AlertCircle];
          const labels = [
            "Total Projects",
            "Total Tasks",
            "Assigned Tasks",
            "Due Tasks",
          ];
          const descriptions = [
            "Active projects",
            "Tasks across all projects",
            "Tasks assigned to you",
            "Tasks due soon",
          ];
          const IconComponent = icons[index];

          return (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {labels[index]}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{counts[key]}</div>
                <p className="text-xs text-muted-foreground">
                  {descriptions[index]}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex relative py-2 flex-wrap  justify-between">
        <div className="w-6/12">
          <TaskList/>
        </div>
        <div className="w-6/12">
          <TeamMemberList/>
        </div>
      </div>
    </div>
  );
}
