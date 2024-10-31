
// Define a type for roles
type Role = {
  id: number;
  title: string;
  value: string;
};

// Define the destinations
export const destinations: Role[] = [
  {
    id: 1,
    title: "Non Technical",
    value: "NonTech",
  },
  {
    id: 2,
    title: "Technical Team",
    value: "tech",
  },
];

// Define technical and non-technical roles
export const technicalRoles: Role[] = [
  { id: 1, title: "Frontend Developer", value: "Frontend Developer" },
  { id: 2, title: "Backend Developer", value: "Backend Developer" },
  { id: 3, title: "Full Stack Developer", value: "Full Stack Developer" },
];

export const nonTechnicalRoles: Role[] = [
  { id: 4, title: "Project Manager", value: "Project Manager" },
  { id: 5, title: "HR", value: "HR" },
  { id: 6, title: "Sales", value: "Sales" },
  { id: 7, title: "Marketing", value: "Marketing" },
];
