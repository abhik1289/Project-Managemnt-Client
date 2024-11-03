export const MENU_LIST = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Home",
      url: "#",
      items: [
        { title: "Home", url: "/dashboard/", isActive: true },
        { title: "My Tasks", url: "/dashboard/my-task" },
        { title: "Team Members", url: "/dashboard/team-member" },
        { title: "Messages", url: "/dashboard/message" },
      ],
    },
    {
      title: "Authority",
      url: "#",
      items: [
        { title: "Create Workspace", url: "/dashboard/add-workspace" },
        { title: "All Member", url: "#" },
        { title: "Authority", url: "#" },
      ],
    },
  ],
};