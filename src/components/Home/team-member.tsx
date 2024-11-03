import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Project Manager",
    email: "alex.johnson@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
  },
  {
    name: "Sarah Lee",
    role: "Senior Developer",
    email: "sarah.lee@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    initials: "SL",
  },
  {
    name: "Michael Chen",
    role: "UX Designer",
    email: "michael.chen@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    initials: "MC",
  },
  {
    name: "Emily Davis",
    role: "Marketing Specialist",
    email: "emily.davis@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    initials: "ED",
  },
];

export default function TeamMemberList() {
  return (
    <div className="px-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Our talented professionals working on the project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap ">
            {teamMembers.map((member) => (
              <div
                key={member.email}
                className="flex flex-col my-1 items-center text-center w-6/12"
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.email}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
