import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react"

const tasks = [
  { id: 1, name: "Design new landing page", project: "Website Redesign", dueDate: "2023-11-10", status: "In Progress" },
  { id: 2, name: "Implement authentication", project: "Mobile App", dueDate: "2023-11-15", status: "To Do" },
  { id: 3, name: "Write API documentation", project: "Backend Services", dueDate: "2023-11-08", status: "In Review" },
  { id: 4, name: "Create email templates", project: "Marketing Campaign", dueDate: "2023-11-12", status: "To Do" },
  { id: 5, name: "Fix payment gateway bug", project: "E-commerce Platform", dueDate: "2023-11-07", status: "Urgent" },
]

export default function TaskList() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "To Do":
        return <Circle className="h-4 w-4 text-slate-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "In Review":
        return <CheckCircle2 className="h-4 w-4 text-yellow-500" />
      case "Urgent":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="px-2">
        <Card className="w-full">
      <CardHeader>
        <CardTitle>Assigned Tasks</CardTitle>
        <CardDescription>Your tasks that need attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Task</TableHead>
                <TableHead className="w-[25%]">Project</TableHead>
                <TableHead className="w-[20%]">Due Date</TableHead>
                <TableHead className="w-[15%]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>{task.project}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getStatusIcon(task.status)}
                      <span className="sr-only">{task.status}</span>
                      <span aria-hidden="true">{task.status}</span>
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}