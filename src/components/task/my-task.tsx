'use client'

import React, { useState } from 'react'
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Pencil } from 'lucide-react'

// Task type definition
type Task = {
  id: string
  content: string
  status: 'todo' | 'inProgress' | 'complete'
}

// AssignedWork type definition
type AssignedWork = {
  id: string
  title: string
  deadline: string
  status: 'To Do' | 'In Progress' | 'Complete'
  notes: string
}

// SortableItem component
function SortableItem({ id, content }: { id: string; content: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 mb-2 rounded shadow cursor-move"
    >
      {content}
    </div>
  )
}

// DroppableContainer component
function DroppableContainer({ id, title, tasks }: { id: string; title: string; tasks: Task[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <SortableItem key={task.id} id={task.id} content={task.content} />
          ))}
        </SortableContext>
      </CardContent>
    </Card>
  )
}

// HighlightedNotes component
function HighlightedNotes({ notes }: { notes: string }) {
  const parts = notes.split(/(#error|#complete|#review)/g)
  return (
    <div>
      {parts.map((part, index) => {
        if (part === '#error') {
          return <span key={index} className="bg-red-200 text-red-800 px-1 rounded">error</span>
        } else if (part === '#complete') {
          return <span key={index} className="bg-green-200 text-green-800 px-1 rounded">complete</span>
        }else if (part === '#review') {
          return <span key={index} className="bg-yellow-200 text-yellow-800 px-1 rounded">review</span>
        } else {
          return <span key={index}>{part}</span>
        }
      })}
    </div>
  )
}

// Main component
export default function TaskManagement() {
  const [activeTab, setActiveTab] = useState('board')
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', content: 'Task 1', status: 'todo' },
    { id: '2', content: 'Task 2', status: 'inProgress' },
    { id: '3', content: 'Task 3', status: 'complete' },
    { id: '1', content: 'Task 10', status: 'todo' },

  ])
  const [assignedWork, setAssignedWork] = useState<AssignedWork[]>([
    { id: '1', title: 'Project A', deadline: '2023-12-31', status: 'In Progress', notes: 'Ongoing development. #error Found a bug in the login system.' },
    { id: '2', title: 'Task B', deadline: '2023-11-15', status: 'To Do', notes: 'Requires planning. #complete Initial design phase.' },
    { id: '3', title: 'Review C', deadline: '2023-10-30', status: 'Complete', notes: 'Feedback provided. #complete All issues resolved.' },
  ])
  const [editingNotes, setEditingNotes] = useState<{ id: string; notes: string } | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setTasks((items) => {
        const activeTask = items.find(item => item.id === active.id)
        if (!activeTask) return items

        const newStatus = over.id as 'todo' | 'inProgress' | 'complete'
        const updatedTask = { ...activeTask, status: newStatus }

        return items.map(item => item.id === active.id ? updatedTask : item)
      })
    }
  }

  const handleStatusChange = (id: string, newStatus: AssignedWork['status']) => {
    setAssignedWork((prevWork) =>
      prevWork.map((work) =>
        work.id === id ? { ...work, status: newStatus } : work
      )
    )
  }

  const handleNotesChange = (id: string, newNotes: string) => {
    setAssignedWork((prevWork) =>
      prevWork.map((work) =>
        work.id === id ? { ...work, notes: newNotes } : work
      )
    )
    setEditingNotes(null)
  }

  const todoTasks = tasks.filter(task => task.status === 'todo')
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress')
  const completeTasks = tasks.filter(task => task.status === 'complete')

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="board">Task Board</TabsTrigger>
          <TabsTrigger value="assigned">Assigned Work</TabsTrigger>
        </TabsList>
        <TabsContent value="board">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DroppableContainer id="todo" title="To Do" tasks={todoTasks} />
              <DroppableContainer id="inProgress" title="In Progress" tasks={inProgressTasks} />
              <DroppableContainer id="complete" title="Complete" tasks={completeTasks} />
            </div>
          </DndContext>
        </TabsContent>
        <TabsContent value="assigned">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Work</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedWork.map((work) => (
                    <TableRow key={work.id}>
                      <TableCell>{work.title}</TableCell>
                      <TableCell>{work.deadline}</TableCell>
                      <TableCell>
                        <Select
                          value={work.status}
                          onValueChange={(value: AssignedWork['status']) => handleStatusChange(work.id, value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <HighlightedNotes notes={work.notes} />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="ml-2">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Notes</DialogTitle>
                            </DialogHeader>
                            <Textarea
                              value={editingNotes?.id === work.id ? editingNotes.notes : work.notes}
                              onChange={(e) => setEditingNotes({ id: work.id, notes: e.target.value })}
                              placeholder="Enter notes here... Use #error or #complete to highlight"
                              className="min-h-[100px]"
                            />
                            <div className="text-sm text-gray-500 mt-2">
                              Tip: Use #error to highlight errors and #complete to highlight completed items.
                            </div>
                            <Button onClick={() => handleNotesChange(work.id, editingNotes?.notes || work.notes)}>
                              Save Notes
                            </Button>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}