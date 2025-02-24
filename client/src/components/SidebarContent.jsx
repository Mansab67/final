import SidebarBullet from "./SidebarBullet";
import React from "react"
const SidebarContent = () => {
  return (
    <ul className="hidden sm:flex flex-col gap-[10px]">
      <SidebarBullet color="bg-green-500" text="Mobile App" />
      <SidebarBullet color="bg-orange-500" text="Website Redesign" />
      <SidebarBullet color="bg-purple-200" text="Design System" />
      <SidebarBullet color="bg-blue-400" text="Wireframes" />
    </ul>
  );
};

export default SidebarContent;