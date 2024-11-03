"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckSquare, ListTodo, AlertCircle } from "lucide-react";
export default function HomeBox() {
  const [counts, setCounts] = useState({ projects: 0, tasks: 0, assigned: 0, due: 0 })
  const targetCounts = { projects: 12, tasks: 78, assigned: 32, due: 15 }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prevCounts => {
        const newCounts = { ...prevCounts }
        let allReached = true
        for (const key in targetCounts) {
          if (newCounts[key] < targetCounts[key]) {
            newCounts[key] += 1
            allReached = false
          }
        }
        if (allReached) clearInterval(interval)
        return newCounts
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="p-2 main_wrapper">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.projects}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.tasks}</div>
            <p className="text-xs text-muted-foreground">
              Tasks across all projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assigned Tasks
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.assigned}</div>
            <p className="text-xs text-muted-foreground">
              Tasks assigned to you
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.due}</div>
            <p className="text-xs text-muted-foreground">Tasks due soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
