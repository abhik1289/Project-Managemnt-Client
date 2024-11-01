'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, LockIcon, PhoneIcon } from 'lucide-react'

export default function ProfilePage() {
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [showMPINSet, setShowMPINSet] = useState(false)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value="John Doe" readOnly />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="john.doe@example.com" readOnly />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="work-mobile">Work Mobile</Label>
              <div className="flex">
                <PhoneIcon className="w-4 h-4 mr-2 mt-3" />
                <Input id="work-mobile" value="+1 (555) 123-4567" readOnly />
              </div>
            </div>
            <div>
              <Label htmlFor="personal-mobile">Personal Mobile</Label>
              <div className="flex">
                <PhoneIcon className="w-4 h-4 mr-2 mt-3" />
                <Input id="personal-mobile" value="+1 (555) 987-6543" readOnly />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="joining-date">Joining Date</Label>
            <div className="flex">
              <CalendarIcon className="w-4 h-4 mr-2 mt-3" />
              <Input id="joining-date" value="January 1, 2023" readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Total Assigned Projects</Label>
              <p className="text-2xl font-bold">15</p>
            </div>
            <div>
              <Label>Completed Projects</Label>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div>
              <Label>Due Tasks</Label>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button 
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="w-full justify-start"
            >
              <LockIcon className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            {showPasswordChange && (
              <div className="mt-4 space-y-4">
                <Input type="password" placeholder="Current Password" />
                <Input type="password" placeholder="New Password" />
                <Input type="password" placeholder="Confirm New Password" />
                <Button>Update Password</Button>
              </div>
            )}
          </div>
          <Separator />
          <div>
            <Button 
              onClick={() => setShowMPINSet(!showMPINSet)}
              className="w-full justify-start"
            >
              <LockIcon className="w-4 h-4 mr-2" />
              Set MPIN
            </Button>
            {showMPINSet && (
              <div className="mt-4 space-y-4">
                <Input type="password" placeholder="Enter MPIN" maxLength={4} />
                <Input type="password" placeholder="Confirm MPIN" maxLength={4} />
                <Button>Set MPIN</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}