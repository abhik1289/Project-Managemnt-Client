export const MENU_LIST = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Home",
      url: "#",
      items: [
        { title: "Home", url: "#", isActive: true },
        { title: "My Tasks", url: "/" },
        { title: "Completed Tasks", url: "#" },
        { title: "Team Members", url: "/dashboard/team-member" },
        { title: "Messages", url: "/dashboard/message" },
      ],
    },
    {
      title: "Creation",
      url: "#",
      items: [
        { title: "Create Workspace", url: "#" },
        { title: "Previous Workspaces", url: "#" },
        { title: "Assign Role", url: "#" },
      ],
    },
  ],
};