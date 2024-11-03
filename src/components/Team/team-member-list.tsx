'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react'

const initialTeamMembers = [
  { id: 1, name: "Alex Johnson", email: "alex.johnson@example.com", role: "Project Manager", status: "In Progress", tasks: ["Task 1", "Task 2", "Task 3"] },
  { id: 2, name: "Sarah Lee", email: "sarah.lee@example.com", role: "UX Designer", status: "To Do", tasks: ["Task 4", "Task 5"] },
  { id: 3, name: "Mike Chen", email: "mike.chen@example.com", role: "Full Stack Developer", status: "Complete", tasks: ["Task 6", "Task 7", "Task 8"] },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com", role: "Marketing Specialist", status: "In Progress", tasks: ["Task 9"] },
  { id: 5, name: "Chris Wilson", email: "chris.wilson@example.com", role: "Data Analyst", status: "To Do", tasks: ["Task 10", "Task 11"] },
]

const roles = ["Project Manager", "UX Designer", "Full Stack Developer", "Marketing Specialist", "Data Analyst"]
const statuses = ["To Do", "In Progress", "Complete"]

export default function Component() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    status: 'To Do',
    tasks: [],
    description: ''
  })
  const [newTask, setNewTask] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (roleFilter === 'All Roles' || member.role === roleFilter) &&
    (statusFilter === 'All Statuses' || member.status === statusFilter)
  )

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { ...newMember, id: teamMembers.length + 1 }])
    setNewMember({ name: '', email: '', role: '', status: 'To Do', tasks: [], description: '' })
    setIsDialogOpen(false)
  }

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setNewMember({ ...newMember, tasks: [...newMember.tasks, newTask.trim()] })
      setNewTask('')
    }
  }

  const handleEditTask = (memberId: number, action: string) => {
    alert(`${action} task for member with ID ${memberId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-yellow-200 text-yellow-800'
      case 'To Do': return 'bg-blue-200 text-blue-800'
      case 'Complete': return 'bg-green-200 text-green-800'
      default: return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Search className="w-4 h-4 text-gray-500 -ml-8" />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" /> Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                  defaultValue={newMember.role}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(value) => setNewMember({ ...newMember, status: value })}
                  defaultValue={newMember.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tasks" className="text-right">
                  Tasks
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="tasks"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Enter a task"
                    />
                    <Button onClick={handleAddTask} type="button">Add</Button>
                  </div>
                  <ul className="text-sm">
                    {newMember.tasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newMember.description}
                  onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddMember}>Add Team Member</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select onValueChange={setRoleFilter} defaultValue={roleFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Roles">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Statuses">All Statuses</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[150px]">Role</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[200px]">Assigned Tasks</TableHead>
              <TableHead className="w-[100px]">Edit Task</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="View tasks" />
                    </SelectTrigger>
                    <SelectContent>
                      {member.tasks.map((task, index) => (
                        <SelectItem key={index} value={task}>{task}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditTask(member.id, 'Edit')}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Task</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditTask(member.id, 'Delete')}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete Task</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}